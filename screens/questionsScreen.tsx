import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image, DevSettings} from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetQuestionDetails,SubmitAnswerForQuestion,UpdateSubmittedAnswerForQuestion,SubmitCompleted} from '../src/graphql/queries';
import { Avatar, Button, Card, Title, Paragraph,List } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioGroup, RadioButton } from 'react-native-radio-btn';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

const apolloClient = client;
const radioItems= [
      {
        id: 1,
        label: 'Yes',
      },
      {
        id: 2,
        label: 'No',
      },
    ];
var dict: string[] = [];
var key;
var value;
var dictId:string[] = [];
var temp = new Array();
var questionCount: number;
var processDataId: any[];

export default function questionsScreen({route,navigation}: {route: any,navigation: any}) {

  const { userId,operationTheaterID,processID, processName } = route.params;
  //const [surgeryCount,setSurgeryCount] = React.useState('');
  //const [surgeon,setSergeon] = React.useState('');
  const [_data,setfetchData] = React.useState(false);
  const [disbaleCompleted,setDisableCompleted] = React.useState(true);
  const [disableButtons,setDisableButtons] = React.useState(false);
  let { loading, error, data:questions_data ,refetch} = useQuery(GetQuestionDetails,{variables:{
            processID:processID,
            Date:new Date().toISOString().slice(0, 10),
            app_user:userId,
            operation_theater:operationTheaterID
  }}); 

  useEffect(() => {
    if(questions_data){
        
    }
  },[questions_data]);

  React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setDisableCompleted(true);
        apolloClient
        .query({
          query: GetQuestionDetails,
          variables:{
            processID:processID,
            Date:new Date().toISOString().slice(0, 10),
            app_user:userId,
            operation_theater:operationTheaterID
          },
          fetchPolicy: "network-only"
        })
        .then((Result) => {
            questions_data = Result.data;
            dict = []
            dictId = []
            temp=[];
            processDataId=[];
            questionCount = questions_data.processDetail.questions.length;
            if(questions_data.processesData.length == questionCount){
              setDisableCompleted(false);
            }
            if(questions_data.processesData.length>=1 && questions_data.processesData[0].check_editable){
              setDisableButtons(true);
              setDisableCompleted(true);
            }
            for(var i =0; i< questions_data.processesData.length;i++){
              key =  questions_data.processesData[i].question.id,
              value = questions_data.processesData[i].Answer,
              dict[key] = value;
              processDataId.push(questions_data.processesData[i].id);
              dictId[key] = questions_data.processesData[i].id;
              temp.push(key);  
            }
            setfetchData(true);
        });
      });
      return unsubscribe;
    }, [navigation]);



  const [mutateFunction, {data}] = useMutation(SubmitAnswerForQuestion);
  useEffect(()=>{
      if (data) {
        dictId[data.createProcessesDatum.processesDatum.question.id] = data.createProcessesDatum.processesDatum.id;
        processDataId.push(data.createProcessesDatum.processesDatum.id);
        if(Object.keys(dictId).length == questionCount){
          setDisableCompleted(false);
          
        }
      }
  },[data]);
  
  const callQuery = (index: any,value: any) => {
      temp.push(index);
      dictId[index];
      mutateFunction({
        variables: {
          operation_theater: parseInt(operationTheaterID),
          question: parseInt(index),
          app_user: parseInt(userId),
          process_detail: parseInt(processID),
          Date:new Date().toISOString().slice(0, 10),
          Answer: value,
        }
      });
  };

  let [updateFunction, {data:updateFunctiondata }] = useMutation(UpdateSubmittedAnswerForQuestion);

  const updateQuery = (index: any,value: any) => {
    updateFunction({
      variables: {
        question_Id: parseInt(index),
        Answer: value,
      }
    });
  };


  const sendQuery=(index: any,value: any)=>{
    if(value == 0 || value == 1){
      value = (value == 0 ? "True": "False")
    }
    if(temp.indexOf(index)!=-1){ 
      updateQuery(dictId[index],value);
    }
    else callQuery(index,value);
  }

  const [mutateEditableFunction, {data:SubmitEditableData }] = useMutation(SubmitCompleted);

  const submitEditable = ()=>{
    setDisableButtons(true);
    setDisableCompleted(true);
    mutateEditableFunction({
      variables: {
        processes_data: processDataId.map(Number),
      }
    });
  }

  const renderResources = ({item}: {item: any}) => {
    return (
    <View style={styles.item}>
      <Text style={[styles.appButtonText,{flex:1,marginBottom:18 }]}>
        {item.Question}
      </Text>
      {item.type == "value_based"?(<>
        <Picker
          //selectedValue={surgeryCount}
          enabled = {!disableButtons}
          style={{ height: 40,borderRadius:7,backgroundColor:"white",
          borderColor:"#959595",borderWidth:1,fontSize: 16,color: '#959595',fontWeight:"bold"}}
          onValueChange={(itemValue, itemIndex) => sendQuery(item.id,itemValue)}
        >
        <Picker.Item label="0" value="0" />
        <Picker.Item label="01" value="1" />
        <Picker.Item label="02" value="2" />
        <Picker.Item label="03" value="3" />
        <Picker.Item label="04" value="4" />
        <Picker.Item label="05" value="5" />
        <Picker.Item label="06" value="6" />
        <Picker.Item label="07" value="7" />
        <Picker.Item label="08" value="8" />
        <Picker.Item label="09" value="9" />
      </Picker>
      </>):(
        item.type == "surgeon"?(<>
        <Picker
          //selectedValue={surgeon}
          enabled = {!disableButtons}
          style={{ height: 40,borderRadius:7,backgroundColor:"white",
          borderColor:"#959595",borderWidth:1,fontSize: 16,color: '#959595',fontWeight:"bold"}}
          onValueChange={(itemValue, itemIndex) => sendQuery(item.id,itemValue)}
        >
        <Picker.Item label="Surgeon 1" value="Surgeon 1" />
        <Picker.Item label="Surgeon 2" value="Surgeon 2" />
        <Picker.Item label="Surgeon 3" value="Surgeon 3" />
        <Picker.Item label="Surgeon 4" value="Surgeon 4" />
        <Picker.Item label="Surgeon 5" value="Surgeon 5" />
        <Picker.Item label="Surgeon 6" value="Surgeon 6" />
        <Picker.Item label="Surgeon 7" value="Surgeon 7" />
        <Picker.Item label="Surgeon 8" value="Surgeon 8" />
        <Picker.Item label="Surgeon 9" value="Surgeon 9" />
        <Picker.Item label="Surgeon 10" value="Surgeon 10" />
      </Picker>
      </>):(
       <RadioGroup 
          selectedIndex={dict[item.id] == "True"? 0 : (dict[item.id]=="False"?1:null)}
          onSelect={(index: any, value: any) => sendQuery(item.id,index)}
          style={{flexDirection:"row",justifyContent: 'space-between'}}
          >
          {radioItems.map((item, index) => {
            return (
              <RadioButton
                key={index}
                value={item.label}
                displayText={item.label}
                displayTextColor="#959595"
                displayTextActiveColor="#fff"
                prefixColor="#006bcc"
                prefixActiveColor="#006bcc"
                style={{width:150,alignContent: "center",borderWidth:1,borderColor:"#979797"}}
                disabled={disableButtons}
              />
            );
          })}
        </RadioGroup>))}
    </View>
    );
  };
         
  return (  
    <>
       <StatusBar
        animated={true}
        backgroundColor="#ff8d48"
        hidden={false} />
         <View style={{backgroundColor:"#ff8d48",width:"100%",height:"100%"}}>
          <View style={styles.header}>
            <Image
                style={{width:"100%",height:"100%",resizeMode: 'cover'}}
               source={require('../Images/S-2-Autoclave.png')}
            />
          </View>
        <View style={{flex:1,backgroundColor:'white',borderTopLeftRadius:30,}}>
          <View style={{justifyContent:'space-around',height:50,marginLeft:22,marginTop:26}}>  
            <Text style={styles.headerTextStyle}>{processName}</Text>
          </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch',marginVertical:10,marginTop:10}}>
        {_data && (
          <FlatList
                  style={{width:"80%",alignSelf: "center"}}
                  data={questions_data.processDetail.questions}
                  keyExtractor={(item, index) => item.id}
                  renderItem={renderResources}
          />)}

        </View>
        <View style={{justifyContent:'space-around'}}>
          <Button  mode="contained" color ={"#006bcc"} disabled={disbaleCompleted}  
          style={{width:"100%",height:40, justifyContent:"center",alignSelf:"center"}} 
          onPress={() => submitEditable()}>
            Completed
          </Button> 
        </View>
        </View>
        </View>
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
    backgroundColor: '#ff8d48',
    alignItems: 'center',
    justifyContent: 'center',
    height:150
  },
  container: {
    marginTop:150,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopLeftRadius:30,
    height:"100%",
  },
  item: {
    marginBottom:15,
    width:"100%",
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flexDirection:"row",
    justifyContent: 'space-between',
    backgroundColor:"#ffffff",
    borderRadius:6,
    margin:10,
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
    fontWeight: "normal",
    textAlign: "left",
    textAlignVertical:"center",
  }
});
