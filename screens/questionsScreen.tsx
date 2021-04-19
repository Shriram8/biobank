import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetQuestionDetails,SubmitAnswerForQuestion} from '../src/graphql/queries';
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
export default function questionsScreen({route}: {route: any,navigation: any}) {
    const { userId,operationTheaterID,processID, processName } = route.params;
    const [expanded, setExpanded] = React.useState(true);
    const [surgeryCount,setSurgeryCount] = React.useState('');
    const { loading, error, data:questions_data } = useQuery(GetQuestionDetails,{variables:{
            processID:processID,
            Date:new Date().toISOString().slice(0, 10),
            app_user:userId,
            operation_theater:operationTheaterID
          }}); 
    if(questions_data){
        dict = []
        console.log("Data",questions_data.processesData);
        for(var i =0; i< questions_data.processesData.length;i++){
            
                key =  questions_data.processesData[i].question.id,
                value = questions_data.processesData[i].Answer
                dict[key] = value;
        }
        console.log("--------",dict);
    }

    let [mutateFunction, {data }] = useMutation(SubmitAnswerForQuestion);
    if (data) {
      console.log("DATA",data);
    }
  const callQuery = (index: any,value: any) => {
    console.log("Index--"+operationTheaterID+"--value--"+userId+"--",processID);
    mutateFunction({
      variables: {
        
        operation_theater: parseInt(operationTheaterID),
        question: parseInt(index),
        app_user: parseInt(userId),
        process_detail: parseInt(processID),
        Date:new Date().toISOString().slice(0, 10)
      }
    });
  };
   const sendQuery=(index: any,value: any)=>{
    callQuery(index,value);
   }

  const renderResources = ({item}: {item: any}) => {
    console.log("Item ..."+item.id+"dict"+dict[item.id]);
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
          selectedIndex={dict[item.id]}
          onSelect={(index: any, value: any) => sendQuery(item.id,index)}
          style={{flexDirection:"row",justifyContent: 'space-between'}}
          >
          {radioItems.map((item, index) => {
            return (
              <RadioButton
                key={index}
                value={item.label}
                //isSelected={item.selected}
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


         
  return (  
    <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        <View style={{backgroundColor:"#006bcc"}}>
        <View style={styles.header}>

        </View>
        <View style={styles.container}>
         <View style={styles.headerTextLabel}>
        <Text style={styles.headerTextStyle}>{processName}</Text>
        </View>
        {questions_data && (
         <View style={{width:"100%"}}>
          <FlatList
            style={{width:"90%",alignSelf: "center"}}
            data={questions_data.processDetail.questions}
            keyExtractor={(item, index) => item.id}
            renderItem={renderResources}
          />
          <Button  mode="contained" style={{width:200,height:50, alignSelf:"center"}} onPress={() => console.log('Pressed')}>
            Submit
          </Button>
        </View>
      )}
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
