import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetQuestionDetails} from '../src/graphql/queries';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioGroup, RadioButton } from 'react-native-radio-btn';

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
export default function questionsScreen({route,navigation}: {route: any,navigation: any}) {
    const { processID, processName } = route.params;
    const { loading, error, data } = useQuery(GetQuestionDetails,{variables:{
            processID:processID
          }}); 
    if(data){
        console.log("Data",data.processDetail.questions);
    }
    if(error){
        console.log("Error",error);
    }
    if(loading){
        console.log("loading",loading);
    }


  const renderResources = ({item}: {item: any}) => {
    return (
    <View style={styles.item}>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {item.Question}
      </Text>
       <RadioGroup 
          //selectedIndex={1}
          //onSelect={(index, value) => this.onSelect(index, value)}
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
        </RadioGroup>
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
        {data && (
         <View style={{width:"100%"}}>
          <FlatList
            style={{width:"90%",alignSelf: "center"}}
            data={data.processDetail.questions}
            keyExtractor={(item, index) => item.id}
            renderItem={renderResources}
          />
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
