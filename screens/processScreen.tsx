import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetProcessesDetails,GetAnswersProgress} from '../src/graphql/queries';
import { Divider,ProgressBar } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const apolloClient = client;
var progress: any[] = [];
var questionsCount: any[] = [];
var colorValue: any [] = [];
var IconValue: any [] = [];
export default function processScreen({route, navigation}: {navigation: any, route:any}) {
    const { userId,operationTheaterID,resourceID, resourceName,instance } = route.params;
    const[_progress,setProgress] = useState([]);
    const[_questionsCount,setQuestionsCount]=useState([]);
    let [refresh,setRefresh] = useState(true);
    let [val,setval]=useState([]);
    let { loading, error, data } = useQuery(GetProcessesDetails,{variables:{
        resourceID:parseInt(resourceID)
    }}); 
    if(data){
      
    }
    if(error){
        //console.log("Error",error);
    }
    if(loading){
        //console.log("loading",loading);
    }

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        apolloClient
        .query({
          query: GetProcessesDetails,
          variables:{
            resourceID:parseInt(resourceID)
          }
        })
        .then((Result) => {
           data = Result.data; 
           console.log("Instance is----",instance);
           //console.log("--",data)
            questionsCount =[];
            progress = []
            colorValue =[]
            IconValue = []
                for(var i= 0; i<data.appResource.process_details.length; i++){
                questionsCount[data.appResource.process_details[i].id] = data.appResource.process_details[i].questions.length;
                colorValue[data.appResource.process_details[i].id] = "#959595";
                IconValue[data.appResource.process_details[i].id] = "minus-box";
                apolloClient
                  .query({
                    query: GetAnswersProgress,
                    variables:{
                      processID:data.appResource.process_details[i].id,
                      Date:new Date().toISOString().slice(0, 10),
                      app_user:userId,
                      operation_theater:operationTheaterID,
                      instance:instance
                    },
                    fetchPolicy: "network-only"
                  })
                  .then((Result) => {
                    try{
                      if(Result.data.processesData[0].id){
                        //console.log("Progress Log-------",Result.data);
                        progress[Result.data.processesData[0].process_detail.id] = Result.data.processesData.length;
                        colorValue[Result.data.processesData[0].process_detail.id] = "#ff8d48";
                      }
                      
                      if(Result.data.processesData[0].check_editable){
                        colorValue[Result.data.processesData[0].process_detail.id] = "#0fbb5b";
                      }
                      if(checkIfAnswer_No(Result.data.processesData)){
                         colorValue[Result.data.processesData[0].process_detail.id] = "#f40000";
                      }
                      //console.log("My dictionary-11-"+progress);
                      var t = !refresh;
                      //console.log(t);
                      setRefresh(t);
                      //console.log("set state"+refresh);
                      setval([...val,1]);
                      
                    }catch{
                    }
                  })
                  
              }
              //console.log("My dictionary22--"+questionsCount);
        })
        

      });
      return unsubscribe;
    }, [navigation]);

    useEffect(()=>{
      //console.log("set state---",val)
    },[val]);

    const checkIfAnswer_No = (data: string | any[])=>{
      for(var i = 0; i<data.length;i++){
        if(data[i].Answer == "False"){
          return true
        }
      }
      return false;
    }

    const getProgressValue = (id: number) =>{
      //console.log("Progress bar",progress[id]/questionsCount[id])
      try{
        if(progress[id]){
          var value = progress[id]/questionsCount[id];
          // if(value == 1){
          //   if(colorValue[id] != "#f40000")
          //     colorValue[id] = "#0fbb5b"
          // }
          return (progress[id]/questionsCount[id]);
        }
      }
      catch{
        return 0;
      }
      return 0; 
    }

    useEffect(() => {

    },[data]);

    const changeIconSet=(id: number)=>{
      try{
        if(progress[id]){
          var value = progress[id]/questionsCount[id];
            if(colorValue[id] == "#0fbb5b"){
              return "checkbox-marked";
            }
            else if(colorValue[id] == "#f40000")
              return "alert-box"
            else if(value != 1 )
              return "minus-box"
        }
      }
      catch{
        return "minus-box"
      }
      return "minus-box"
    }

    const renderResources = ({item}: {item: any}) => {

    return (
    <View style={styles.item}>
      <TouchableOpacity
      style={[styles.appButtonContainer,{flex:1,zIndex:1}]}onPress={()=>{
        navigation.navigate('questionsScreen',{
            userId:userId,
            processID: item.id,
            processName: item.process_name,
            operationTheaterID: operationTheaterID,
            instance:instance,
          })}}>
      
      <View style={{width:30,height:30,marginLeft:14}}>
      <MaterialCommunityIcons 
        name={changeIconSet(item.id) }size={30} color={colorValue[item.id]}/>
      </View>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {"P"+item.Number+"-"+item.process_name}
      </Text>
      <View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>
      <MaterialCommunityIcons
        name='arrow-right' size={30}/>
      </View>
      
      </TouchableOpacity>
      <View style={{height:10,marginTop:-11}}>
        <ProgressBar progress={getProgressValue(item.id)} color={colorValue[item.id]} style={{width:'92%',alignSelf:"center",
        height:4,backgroundColor:"white",alignContent:"center"}} />
      </View>
      
    </View>
    );
  };


  return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        {data && (
        <View style={{width:"100%",height:"100%",backgroundColor:"white"}}>
          <FlatList
            extraData = {refresh}
            style={{width:"90%",alignSelf: "center",}}
            data={data.appResource.process_details}
            keyExtractor={(item, index) => item.id}
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
    height:80,
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flexDirection:"row",
    backgroundColor:'#ffffff',
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
