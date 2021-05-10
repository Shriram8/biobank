import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetSurgeryDetails,preProcessProgress,GetSurgeryDetails_OTStaff,preProcessProgress_OTStaff} from '../src/graphql/queries';
import { ProgressBar } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
const apolloClient = client;
let _data: any[] = [];
const preSurgeryProcessCount = 2;
const preSurgeryProcessID = 3; //id from order.
const inBetweenSurgeryProcessID = 4;
let lock: boolean[] = [];
let moduleLock: boolean;
var progress: any[] = [];
var colorValue: any[] = [];
var iconValue: any[] = [];
var processCount: any[] = [];
var netProgress: any[] = [];
var _text: string;
var red = "#f40000";
var green = "#0fbb5b";
var orange = "#ff8d48";
var alert = "alert-box";
var check = "checkbox-marked";
var minusBox = "minus-box";
var _Result: any [] = [];
var _length: number;
var _headerColor;

export default function preProcessScreen({route, navigation}: {navigation: any, route:any}) {
    const { userId, operationTheaterID, operationTheaterName, userType} = route.params;
    const [renderFlatlistData,setRenderFlatlistData] = useState();
    const [message,setMessage]=useState(null);
    const [refresh,setRefresh] = useState(0);
    const [updateMessage,setUpdateMessage] = useState(0);
    const [headerColor,setHeaderColor] = useState("")
    const [headerIcon,setHeaderIcon]= useState("");
    const [resultsFetched,setResultsFetched] = useState(0);
    const jewelStyle = (item: number | undefined)=>{
      return (item == 1)?{backgroundColor:"white"}:{backgroundColor:"#b6b6b6"}
    }

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setMessage(null);
        processCount =[];
        progress = [];
        netProgress = [];
        _text = "Ongoing start of the day";
        _data = [];
        lock =[];
        _Result = [];
        _length = 0;
        colorValue = [];
        iconValue = [];
        moduleLock = false;
        apolloClient
        .query({
          query: GetSurgeryDetails_OTStaff,
          variables:{
            operation_theater:parseInt(operationTheaterID),
            Date:new Date().toISOString().slice(0, 10),
            // app_user:parseInt(userId),
          },
          fetchPolicy:"network-only"
        })
        .then((Result) => {
          //console.log("-----Result",Result);
            for(var i = 0;i<2;i++){
                _data.push(Result.data.appResources[i]);
                
                if(i==0){
                  lock.push(false);
                }
                else{
                  lock.push(true);
                }
            }
            try{
              
              for(var i =0; i< Result.data.questions[0].processes_data[0].Answer;i++){
                if(i == 0){
                  _data.push(Result.data.appResources[preSurgeryProcessID-1]);
                }else
                _data.push(Result.data.appResources[inBetweenSurgeryProcessID-1]);
                lock.push(true);
              }
            }catch{

            }
            _data.push(Result.data.appResources[Result.data.appResources.length-1]);
            lock.push(true);
            //console.log("Data---",_data);
            setRenderFlatlistData(Result.data);
              for(var i= 0;i<_data.length;i++){
                colorValue[i] = orange;
                iconValue[i] = minusBox;
                processCount[i]=_data[i].process_details.length;
                progress[i] = 0;
                _length = _length + processCount[i];
                    for(var k=0;k<processCount[i];k++){
                      apolloClient
                      .query({
                        query: preProcessProgress_OTStaff,
                        variables:{
                          operation_theater:parseInt(operationTheaterID),
                          Date:new Date().toISOString().slice(0, 10),
                          //app_user:parseInt(userId),
                          instance: i,
                          process_detail: _data[i].process_details[k].id
                        },
                        fetchPolicy:"network-only"
                      })
                      .then((Result) => {
                        _Result.push(Result.data);
                        if(_Result.length == _length){
                          setResultsFetched(prevCount => prevCount + 1);
                        }
                                                
                      })
                    }  
              }
            })
           
      });
      return unsubscribe;
    }, [navigation]);

    
    React.useEffect(()=>{
      if(_Result.length == _length){
        //console.log("GOT DATATA")
        for(var k = 0;k<_Result.length;k++){
                    try{
                          if(_Result[k].processesData[0].check_editable){
                            //console.log("instance-----",_Result[k].processesData[0]);
                            var p = _Result[k].processesData[0].instance;
                            progress[p] = progress[p]+1;
                            netProgress[p] = progress[p]/processCount[p];
                            if(netProgress[p]==1 && _Result[k].processesData[0].check_editable.processCleared){
                              if(colorValue[p] != red ){
                                colorValue[p] = green 
                                iconValue[p] = check;
                                lock[p+1] = false;
                                setUpdateMessage(prevCount => prevCount + 1);
                              }   
                            }
                            if(netProgress[p]>0 && netProgress[p]<1){
                              if(colorValue[p] != red ){
                                colorValue[p] = orange;
                                iconValue[p] = minusBox;
                              }
                            }
                            if(!_Result[k].processesData[0].check_editable.processCleared){
                              colorValue[p] = red 
                              iconValue[p] = alert
                              lock[p+1] = true;
                            }
                            
                          }
                          setRefresh(prevCount => prevCount + 1);
                        }
                        catch{

                        }

          
        }
        //console.log("COLOR VALUE___",colorValue);
        //console.log("INDEX---",netProgress);
        setHeaderColor(colorValue[netProgress.length-1]);
        setHeaderIcon(iconValue[netProgress.length-1]);
        setHeaderText();
      }
    },[resultsFetched]);

    const setHeaderText = ()=>{
      //console.log("NET PROGRESS LENGTH--",netProgress.length,)

      switch(colorValue[netProgress.length-1]){
        case red:
          //console.log("RED")
          if(netProgress.length<=preSurgeryProcessCount){
            
            setMessage("Not Cleared for start of day");
          }else if(netProgress.length == processCount.length){
            setMessage("Not Cleared for end of day");
          }else{
            var temp = "Not Cleared for surgery -0"+(netProgress.length-preSurgeryProcessCount)
            setMessage(temp);
          }
          break;
        case orange:
          //console.log("ORANGE")
          if(netProgress.length<=preSurgeryProcessCount){
            setMessage("Ongoing for start of day");
          }else if(netProgress.length == processCount.length){
            setMessage("Ongoing end of day");
          }else{
            var temp = "Ongoing for surgery -0"+(netProgress.length-preSurgeryProcessCount)
            setMessage(temp);
          }
          break;
        case green:
          //console.log("GREEN")
          if(netProgress.length<preSurgeryProcessCount){
            setHeaderColor(orange);
            setHeaderIcon(minusBox);
            setMessage("Ongoing for start of day");
            break;
          }
          if(netProgress.length == preSurgeryProcessCount){
            setMessage("Cleared for start of day");
          }else if(netProgress.length == processCount.length){
            setMessage("Cleared for end of day");
          }else{
            var temp = "Cleared for surgery -0"+(netProgress.length-preSurgeryProcessCount)
            setMessage(temp);
          }
          break;
      }
      if(netProgress[netProgress.length-1]==1){
        if(colorValue[netProgress.length-1] == green){

        }

      }
      
    }

    const changeColorSet=(id: number)=>{
      try{
        if(progress[id]){
            return colorValue[id];
        }
      }
      catch{
        return "#959595"
      }
      return "#959595"
    }

    const getText = (processOrder: number,id: number,index: number)=>{ 
      //console.log("processOrder:",processOrder,id,index)
    return (processOrder == preSurgeryProcessCount)?"Cleared for start of day":
    ((processOrder == 3 || processOrder == 4)?("Cleared for Surgery"+(id == 4 ?"-0"+(index-1):(id == 6 ?"-0"+(index-1):""))):("Cleared for end of the day"))
    }

    const changeColorSetText=(id: number)=>{
      try{
        if(progress[id]){
          if(netProgress[id]==1){
            if(colorValue[id] == green){
              return colorValue[id];
            }
          }
          
        }
      }
      catch{
        return "#959595"
      }
      return "#959595"
    }

    const changeColorStyle=(processOrder: number,id: number,index: number)=>{
      try{
        if(progress[index]){
            if(colorValue[index] == green){
              return {color:colorValue[index]};
            }
            // else if(colorValue[id] == "#f40000")
            //   return "alert-box"
            else
              return {color:"#959595"}
        }
      }
      catch{
        return {color:"#959595"}
      }
      return {color:"#959595"}
    }

    

    const renderResources = ({item,index}: {item: any,index:any}) => {
    return (
    <View style={styles.item}>
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:80}}>
        <View style={{height:"100%", justifyContent:"center",alignItems:"center"}}>
          <View style={[{width:0.5,height:40,backgroundColor:'#979797'},jewelStyle(item.processOrder)]}>
          </View>
          <View style={{width:18,height:18}}>
          <MaterialCommunityIcons
          name={iconValue[index]} size={18} color={changeColorSet(index)}/>
          </View>
          <View style={{width:0.5,height:40,backgroundColor:"#b6b6b6"}}>
          </View>
        </View>
        
      <TouchableOpacity
      style={[styles.appButtonContainer,{flex:1,zIndex:1,height:60,width:300,borderBottomLeftRadius :2,borderBottomRightRadius:2,marginVertical:12}]} disabled={lock[index]} onPress={()=>{
        navigation.navigate('processScreen',{
            userId: userId,
            userType:userType,
            resourceID: item.id,
            operationTheaterID: operationTheaterID,
            operationTheaterName: route.params.operationTheaterName,
            resourceName:item.name,
            instance: parseInt(index),
          })}}>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,fontSize: 18, fontWeight:'500'},lock[index]?{color: "#959595",}:{}]}>
      {item.id == 4 ?item.name+"-0"+(index-1):(item.id == 6 ?item.name+"-0"+(index-1):item.name)}
      </Text>

      <View style={{ width:18,height:18,marginEnd:14, alignContent:'flex-end'}}>
      <MaterialCommunityIcons
      name='arrow-right' size={18} style={lock[index]?{color: "#959595",}:{color: "#959595"}}/>
      </View>
      </TouchableOpacity>
      
      </View>
      <View style={{height:20,marginTop:-11,marginLeft:28,elevation:6, marginHorizontal:10}}>
        <ProgressBar progress={netProgress[index]} color={colorValue[index]} style={{width:'100%',alignSelf:"center",borderBottomLeftRadius:8,borderBottomRightRadius:8,
        height:4,backgroundColor:"white",alignContent:"center"}} />
      </View>

      {(item.processOrder >= preSurgeryProcessCount)?(
      <View style={[styles.appFlagContainer,{flex:1,marginVertical:12}]} >
      <View style={{width:24,height:24}}>
      <MaterialCommunityIcons
      name='flag' size={24} color={changeColorSetText(index)}/>
      </View>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,},changeColorStyle(item.processOrder,item.id,index)]}>
        {getText(item.processOrder,item.id,index)}
      </Text></View>):(<></>)}
    </View>
    );
  };


  return (  
       <View style={{backgroundColor:'#fff',flex:1}}>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        {message != null ? (<View style={{width:"100%",height:80,
        marginBottom:24,
        backgroundColor:headerColor,justifyContent:"center",alignItems:"center",}}>  
          <View style={{ 
            flexDirection:"row" ,justifyContent:'center',alignItems:'center',flex:1}}>
          <MaterialCommunityIcons
          name={headerIcon} size={30} color='#ffffff'/>
          <Text style={[ { marginRight:14,color:"#ffffff",  fontSize: 18, fontWeight:'bold' }]}>
            {message}
          </Text>
          </View>
          
        </View>):<></>}
        {renderFlatlistData && (
        <View style={{flex:1,backgroundColor:"white"}}>
          <FlatList
            extraData = {refresh}
            style={{width:"90%",alignSelf: "center",}}
            data={_data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderResources}
          />
        </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  headerTextLabel:{
    width:"90%",
    height:25,
    marginTop:25,
    marginBottom:15,
    justifyContent:"center",
  },
  headerTextStyle:{
    fontWeight:'bold',
    fontSize:18,
    color:'#000000'
  },
  header: {
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#006bcc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    marginTop:150,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopLeftRadius:30
  },
  item: {
    backgroundColor: 'white',
    width:"100%",
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flex:1,
    flexDirection:"row",
    backgroundColor:"#ffffff",
    borderRadius:6,
    height:60,
    margin:10,
    alignItems: "center",
    shadowColor: "#F4F4F4",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 1,
    shadowRadius:20,
    elevation: 6,
  },
  appFlagContainer: {
    flexDirection:"row",
    backgroundColor:"#ffffff",
    height:60,
    marginVertical:10,
    alignItems: "center",
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical:"center",
    marginLeft:14,
    width:200,
  }
});
