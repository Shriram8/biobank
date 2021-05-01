import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetSurgeryDetails,preProcessProgress} from '../src/graphql/queries';
import { ProgressBar } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const apolloClient = client;
let _data: any[] = [];
const preSurgeryProcessCount = 2;
const preSurgeryProcessID = 3; //id from order.
let lock: boolean[] = [];
let moduleLock: boolean;
var progress: any[] = [];
var processCount: any[] = [];
var netProgress: any[] = [];
var _text: string;
export default function preProcessScreen({route, navigation}: {navigation: any, route:any}) {
    const { userId, operationTheaterID, operationTheaterName } = route.params;
    const [renderFlatlistData,setRenderFlatlistData] = useState();
    const [message,setMessage]=useState("Ongoing start of the day");
    const [refresh,setRefresh] = useState(0);
    const [updateMessage,setUpdateMessage] = useState(0);
    const jewelStyle = (item: number | undefined)=>{
      return (item == 1)?{backgroundColor:"white"}:{backgroundColor:"#b6b6b6"}
    }

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        processCount =[];
        progress = [];
        netProgress = [];
        _text = "Ongoing start of the day";
        _data = [];
        lock =[];
        moduleLock = false;
        apolloClient
        .query({
          query: GetSurgeryDetails,
          variables:{
            operation_theater:parseInt(operationTheaterID),
            Date:new Date().toISOString().slice(0, 10),
            app_user:parseInt(userId),
          },
          fetchPolicy:"network-only"
        })
        .then((Result) => {
          
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
                
                _data.push(Result.data.appResources[preSurgeryProcessID-1]);
                lock.push(true);
              }
            }catch{

            }
            _data.push(Result.data.appResources[Result.data.appResources.length-1]);
            lock.push(true);
            //console.log("Data---",_data);
            setRenderFlatlistData(Result.data);
              for(var i= 0;i<_data.length;i++){
                processCount[i]=_data[i].process_details.length;
                progress[i] = 0;
                    for(var k=0;k<processCount[i];k++){
                      apolloClient
                      .query({
                        query: preProcessProgress,
                        variables:{
                          operation_theater:parseInt(operationTheaterID),
                          Date:new Date().toISOString().slice(0, 10),
                          app_user:parseInt(userId),
                          instance: i,
                          process_detail: _data[i].process_details[k].id
                        },
                        fetchPolicy:"network-only"
                      })
                      .then((Result) => {
                        //console.log("Result----data",Result);
                        try{
                          if(Result.data.processesData[0].check_editable){
                            //console.log("instance-----",Result.data.processesData[0]);
                            var p = Result.data.processesData[0].instance;
                            progress[p] = progress[p]+1;
                            netProgress[p] = progress[p]/processCount[p];
                            if(netProgress[p] == 1){
                              if(p<preSurgeryProcessCount && !Result.data.processesData[0].check_editable.processCleared){
                                moduleLock = true;
                              }
                              try{
                                lock[p+1] = false;
                                setUpdateMessage(prevCount => prevCount + 1);
                              }catch{

                              }
                            }else{
                              //console.log(netProgress[p]);
                            }
                            
                          }
                          //console.log("Process---",processCount,"Progress---",progress)
                          //console.log("net progress--",netProgress);
                          setRefresh(prevCount => prevCount + 1);
                          //console.log("Refresh",refresh);
                        }
                        catch{

                        }
                        
                      })
                    }  
              }
            })
           
      });
      return unsubscribe;
    }, [navigation]);

    React.useEffect(()=>{
      setMessage(_text)
    },[updateMessage]);

    const changeIconSet=(id: number)=>{
      try{
        if(progress[id]){
            if(netProgress[id] == 1){
              return "checkbox-marked";
            }
            // else if(colorValue[id] == "#f40000")
            //   return "alert-box"
            else
              return "minus-box"
        }
      }
      catch{
        return "minus-box"
      }
      return "minus-box"
    }

    const changeColorSet=(id: number)=>{
      try{
        if(progress[id]){
            if(netProgress[id] == 1){
              return "#0fbb5b";
            }
            // else if(colorValue[id] == "#f40000")
            //   return "alert-box"
            else
              return "#959595"
        }
      }
      catch{
        return "#959595"
      }
      return "#959595"
    }

    const getText = (processOrder: number,id: number,index: number)=>{
    return (processOrder == preSurgeryProcessCount)?"Cleared for start of day":
    ((processOrder == 3)?("Cleared for Surgery"+(id == 4 ?"-0"+(index-1):"")):("Cleared for end of the day"))
    }

    const changeColorStyle=(processOrder: number,id: number,index: number)=>{
      try{
        if(progress[index]){
            if(netProgress[index] == 1){
              try{
                if(netProgress[index+1]!= 1){
                 _text = getText(processOrder,id,index);
                }
              }
              catch{

              }
              return {color:"#0fbb5b"};
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
          <View style={[{width:2,height:40},jewelStyle(item.processOrder)]}>
          </View>
          <View style={{width:30,height:30}}>
          <MaterialCommunityIcons
          name={changeIconSet(index)} size={30} color={changeColorSet(index)}/>
          </View>
          <View style={{width:2,height:40,backgroundColor:"#b6b6b6"}}>
          </View>
        </View>
      <TouchableOpacity
      style={[styles.appButtonContainer,{flex:1,zIndex:1}]} disabled={lock[index]} onPress={()=>{
        navigation.navigate('processScreen',{
            userId: userId,
            resourceID: item.id,
            operationTheaterID: operationTheaterID,
            resourceName: item.name,
            instance: parseInt(index),
          })}}>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,},lock[index]?{color: "#959595",}:{}]}>
        {item.id == 4 ?item.name+"-0"+(index-1):item.name}
      </Text>

      <View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>
      <MaterialCommunityIcons
      name='arrow-right' size={30} style={lock[index]?{color: "#959595",}:{}}/>
      </View>
      </TouchableOpacity>
      
      </View>
      <View style={{height:10,marginTop:-11,marginLeft:30}}>
        <ProgressBar progress={netProgress[index]} color="green" style={{width:'92%',alignSelf:"center",
        height:4,backgroundColor:"white",alignContent:"center"}} />
      </View>

      {(item.processOrder >= preSurgeryProcessCount)?(
      <View style={[styles.appFlagContainer,{flex:1}]} >
      <View style={{width:30,height:30}}>
      <MaterialCommunityIcons
      name='flag' size={30} color={changeColorSet(index)}/>
      </View>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,},changeColorStyle(item.processOrder,item.id,index)]}>
        {getText(item.processOrder,item.id,index)}
      </Text></View>):(<></>)}
    </View>
    );
  };


  return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        <View style={{width:"100%",height:80,
        backgroundColor:"#ff8d48",justifyContent:"center",alignItems:"center",}}>  
          <View style={{
            flexDirection:"row",}}>
          <MaterialCommunityIcons
          name='minus-box' size={30} color='#ffffff'/>
          <Text style={[styles.appButtonText,{flex:1, marginRight:14,color:"#ffffff",width:400,textAlignVertical:"center"}]}>
            {message}
          </Text>
          </View>
          
        </View>
        {renderFlatlistData && (
        <View style={{width:"100%",height:"100%",backgroundColor:"white"}}>
          <FlatList
            extraData = {refresh}
            style={{width:"90%",alignSelf: "center",}}
            data={_data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderResources}
          />
        </View>
        )}
      </>
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
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
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
