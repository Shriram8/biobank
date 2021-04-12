import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetResourcesDetails} from '../src/graphql/queries';
import { Divider } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReactReduxContext } from 'react-redux'

const apolloClient = client;
const date = new Date();

export default function homeScreen({navigation}: {navigation: any}) {
const {store} = useContext(ReactReduxContext)

    const { loading, error, refetch, data } = useQuery(GetResourcesDetails); 
    if(data){
        console.log("Data",data.appResources);
        console.log("Store",store)
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
      <TouchableOpacity
      style={[styles.appButtonContainer,{flex:1}]}onPress={()=>{
        navigation.navigate('processScreen',{
            resourceID: item.id,
            resourceName: item.name,
          })}}>
      <View style={{width:30,height:30,marginLeft:14}}>
      <MaterialCommunityIcons
      name='minus-box' size={30} color='#959595'/>
      </View>
      <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
        {item.name}
      </Text>
      <View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>
      <MaterialCommunityIcons
      name='arrow-right' size={30}/>
      </View>
      </TouchableOpacity>
    </View>
    );
  };


  
  return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        <View style={{backgroundColor:"#006bcc",flex:1}}>
        <View style={styles.header}>
          <View style={styles.headerTextLabel}>
            <Text style={{fontWeight:'bold',fontSize:30,color:"#ffffff"}}>Hello Varun</Text>
            <Divider style={{width:"100%",height:1,backgroundColor:'white'}}/>
          </View>
          <View style={{flexDirection:"row"}}>
            <Text style={{fontWeight:'bold',fontSize:14,color:"#ffffff"}}>{date.toDateString()}</Text>
          </View>
        </View>
        <View style={styles.container}>
         <View style={styles.headerTextLabel}>
        <Text style={styles.headerTextStyle}>Today's Progress</Text>
        </View>
        {data && (
        <View style={{width:"100%"}}>
          <FlatList
            style={{width:"90%",alignSelf: "center",}}
            data={data.appResources}
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
    flex:20,
    borderTopLeftRadius:30
  },
  item: {
    backgroundColor: 'white',
    width:"100%",
    height:90,
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flexDirection:"row",
    backgroundColor:"#ffffff",
    borderRadius:6,
    height:90,
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
