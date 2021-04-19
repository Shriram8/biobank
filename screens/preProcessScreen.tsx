import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetSurgeryDetails} from '../src/graphql/queries';
import { Divider } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const apolloClient = client;
let _data: any[] = [];
const preSurgeryProcessCount = 2;
const preSurgeryProcessID = 3; //id from order.
export default function preProcessScreen({route, navigation}: {navigation: any, route:any}) {
    const { userId, operationTheaterID, operationTheaterName } = route.params;
    const { loading, error, data } = useQuery(GetSurgeryDetails,{variables:{
            operationTheaterID:parseInt(operationTheaterID)
          }}); 
    if(data){
        _data = [];
        for(var i = 0;i<2;i++){
            _data.push(data.appResources[i]);
            console.log("-----------",userId);
        }
        for(var i =0; i< data.operationTheater.surgeries.length;i++){
            _data.push(data.appResources[preSurgeryProcessID-1]);
        }
        _data.push(data.appResources[data.appResources.length-1]);
        console.log("New Data", _data);
    }
    if(error){
        console.log("Error",error);
    }
    if(loading){
        console.log("loading",loading);
    }
    const jewelStyle = (item: number | undefined)=>{
      return (item == 1)?{backgroundColor:"white"}:{backgroundColor:"#b6b6b6"}
    }
    

    const renderResources = ({item}: {item: any}) => {
    return (
    <View style={styles.item}>
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:80}}>
      <View style={{height:"100%", justifyContent:"center",alignItems:"center"}}>
        <View style={[{width:2,height:40},jewelStyle(item.processOrder)]}>
        </View>
        <View style={{width:30,height:30}}>
        <MaterialCommunityIcons
        name='minus-box' size={30} color='#959595'/>
        </View>
        <View style={{width:2,height:40,backgroundColor:"#b6b6b6"}}>
        </View>
      </View>
      <TouchableOpacity
      style={[styles.appButtonContainer,{flex:1}]} onPress={()=>{
        navigation.navigate('processScreen',{
            userId: userId,
            resourceID: item.id,
            operationTheaterID: operationTheaterID,
          })}}>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {item.name}
      </Text>

      <View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>
      <MaterialCommunityIcons
      name='arrow-right' size={30}/>
      </View>
      </TouchableOpacity>
      </View>
      {(item.processOrder >= preSurgeryProcessCount)?(
      <View style={[styles.appFlagContainer,{flex:1}]} >
      <View style={{width:30,height:30}}>
      <MaterialCommunityIcons
      name='flag' size={30} color='#959595'/>
      </View>

      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {(item.processOrder == preSurgeryProcessCount)?"Cleared for start of day":
        ((item.processOrder == 3)?("Cleared for Surgery"):("Cleared for end of the day"))}
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
        {data && (
        <View style={{width:"100%",height:"100%",backgroundColor:"white"}}>
          <FlatList
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
