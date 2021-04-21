import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetQuestionDetails,SubmitAnswerForQuestion,UpdateSubmittedAnswerForQuestion} from '../src/graphql/queries';
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
        label: 'Confirm',
        selected: false,
      },
      {
        id: 2,
        label: 'No',
        selected: false,
      },
    ];
var dict: string[] = [];
var key;
var value;
var dictId:string[] = [];
var temp = new Array();
export default function questionsScreen({route,navigation}: {route: any,navigation: any}) {

    const { userId,operationTheaterID,processID, processName } = route.params;
    const [surgeryCount,setSurgeryCount] = React.useState('');
    const [_data,setfetchData] = React.useState(false);
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
            temp=[]
            for(var i =0; i< questions_data.processesData.length;i++){
              //console.log("Questions screen--",questions_data.processesData);
              key =  questions_data.processesData[i].question.id,
              //console.log("Key-------",key);
              value = questions_data.processesData[i].Answer,
              dict[key] = value;
              dictId[key] = questions_data.processesData[i].id;
              temp.push(key);
            }
            setfetchData(true);
        });
      });
      return unsubscribe;
    }, [navigation]);



  const [mutateFunction, {data }] = useMutation(SubmitAnswerForQuestion);

  useEffect(()=>{
      if (data) {
        dictId[ data.createProcessesDatum.processesDatum.question.id] = data.createProcessesDatum.processesDatum.id;
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
          Answer: (value == 0 ? "Confirm": "No")
        }
      });
    
  };

  let [updateFunction, {data:updateFunctiondata }] = useMutation(UpdateSubmittedAnswerForQuestion);


  const updateQuery = (index: any,value: any) => {
    updateFunction({
      variables: {
        question_Id: parseInt(index),
        Answer: (value == 0 ? "Confirm": "No")
      }
    });
  };


   const sendQuery=(index: any,value: any)=>{
     if(temp.indexOf(index)!=-1){
       updateQuery(dictId[index],value);
     }
     else callQuery(index,value);
   }

  const renderResources = ({item}: {item: any}) => {
    
    return (
    <View style={styles.item}>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {item.Question}
        
      </Text>
      {item.type == "value_based"?(<>
        <Picker
          selectedValue={surgeryCount}
          style={{ height: 30,}}
          onValueChange={(itemValue, itemIndex) => setSurgeryCount(itemValue)}
        >
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
      </Picker>
      </>):(
       <RadioGroup 
          selectedIndex={dict[item.id] == "Confirm"? 0 : (dict[item.id]=="No"?1:null)}
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
                style={{width:150,alignContent: "center",borderWidth:1,
                borderColor:"#979797"}}
              />
            );
          })}
        </RadioGroup>)}
    </View>
    );
  };

{/* <View style={{backgroundColor:"#006bcc"}}>
          <View style={styles.header}>

          </View> 
          <View style={styles.container}>
             <View style={styles.headerTextLabel}>
              <Text style={styles.headerTextStyle}>{processName}</Text>
            </View>
              {_data && (
                <View style={{width:"100%",marginBottom:50,flexGrow: 1}}>
                <FlatList
                  style={{width:"90%",alignSelf: "center",marginBottom:50}}
                  data={questions_data.processDetail.questions}
                  keyExtractor={(item, index) => item.id}
                  renderItem={renderResources}
                  ListFooterComponent={() => 
                  <Button  mode="contained" style={{width:200,height:50,marginBottom:50,backgroundColor:"#006bcc", justifyContent:"center",alignSelf:"center"}} onPress={() => console.log('Pressed')}>
                  Submit
                </Button>}
                />
                </View>
              )}
            </View> 
      </View> */}
         
  return (  
    <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
         <View style={{backgroundColor:"#ff8d48",width:"100%",height:"100%"}}>
          <View style={styles.header}>
            <Image
                style={{width:"100%",height:"100%",resizeMode: 'cover'}}
               source={require('../Images/S-2-Autoclave.png')}
            />
          </View>
        <View style={{flex:1,backgroundColor:'white',borderTopLeftRadius:30,}}>
          <View style={{justifyContent:'space-around',height:50,margin:10}}>  
            <Text style={styles.headerTextStyle}>{processName}</Text>
          </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch',marginVertical:10,marginTop:10}}>
        {_data && (
                <FlatList
                  style={{width:"90%",alignSelf: "center"}}
                  data={questions_data.processDetail.questions}
                  keyExtractor={(item, index) => item.id}
                  renderItem={renderResources}
                  />)}
        </View>
        <View style={{justifyContent:'space-around'}}>
          <Button  mode="contained" style={{width:"100%",height:40,backgroundColor:"#006bcc", justifyContent:"center",alignSelf:"center"}} onPress={() => console.log('Pressed')}>
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
    //marginTop:StatusBar.currentHeight,
    backgroundColor: '#ff8d48',
    alignItems: 'center',
    justifyContent: 'center',
    height:150
  },
  container: {
    //flexDirection:"column",
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
