import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetProcessesDetails} from '../src/graphql/queries';
import { Divider } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const apolloClient = client;

export default function processScreen({route, navigation}: {navigation: any, route:any}) {
    const { resourceID, resourceName } = route.params;
    const { loading, error, refetch, data } = useQuery(GetProcessesDetails,{variables:{
            resourceID:parseInt(resourceID)
          }}); 
    if(data){
        console.log("Data",data.appResource.process_details);
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
      style={[styles.appButtonContainer]}>
      <Text style={[styles.appButtonText]}>
        {"Process-"+item.Number}
      </Text>
      <View style={{marginRight:20,justifyContent:"center"}}>
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
        {data && (
        <View style={{width:"100%",}}>
          <FlatList
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
    height:60,
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flexDirection:"row",
    justifyContent: 'space-between',
    backgroundColor:"#ffffff",
    borderRadius:6,
    height:50,
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
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical:"center",
    marginLeft:20,
    width:200,
    marginRight:20,
  }
});
