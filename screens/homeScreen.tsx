import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image, } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetResourcesDetails} from '../src/graphql/queries';
import {GetSharedResource_OperationTheaters,ENUM_RESOURCE_TYPE} from '../src/graphql/queries';
import { Divider, Button } from 'react-native-paper';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReactReduxContext } from 'react-redux'
// import SlidingPane from "react-sliding-pane";
// import "react-sliding-pane/dist/react-sliding-pane.css";

const apolloClient = client;
const date = new Date();
var location = "Coles Road";
var _data: readonly any[] | null | undefined;
export default function homeScreen({navigation}: {navigation: any}) {
  // const [state, setState] = useState({
  //   isPaneOpenLeft: false,
  // });
const {store} = useContext(ReactReduxContext)
    const { loading, error, refetch, data } = useQuery(GetSharedResource_OperationTheaters); 
    if(data){
      _data = data.appResources.concat(data.operationTheaters);
      console.log("Data",_data);
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
        (item.__typename == "AppResource")?
        navigation.navigate('processScreen',{
            resourceID: item.id,
            resourceName: item.name,
          }):navigation.navigate('preProcessScreen',{
            operationTheaterID: item.id,
            operationTheaterName: item.name,
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
          
          {/* <Button icon={() => (
              <MaterialCommunityIcons
              name='menu' size={30} color="white"/>
              )} onPress={
                () => setState({ isPaneOpenLeft: true })
              }>
            </Button> */}



          <View style={styles.subHeader}>
            <View style={{ width:100,height:30,marginEnd:14, justifyContent:'center',flexDirection:'row',backgroundColor:"red",}}>
              <MaterialCommunityIcons
              name='map-marker-outline' color= "white" size={20}/>
              <Text style={styles.location}>{location}</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View style={{ width:'50%',height:30,marginEnd:14, alignContent:'flex-end', flexDirection:'row',backgroundColor:"pink"}}>
              <MaterialCommunityIcons
              name='calendar-text' color= "white" size={20}/>
               <Text style={styles.location}>{date.toDateString()}</Text>
              </View>
              {/* <Text style={{fontWeight:'bold', textAlign: "right",fontSize:14,color:"#ffffff"}}>{date.toDateString()}</Text> */}
            </View>

        </View>
        
        
        <View style={styles.container}>
         <View style={styles.headerTextLabel}>
        <Text style={styles.headerTextStyle}>Today's Progress</Text>
        </View>
        {_data && (
        <View style={{width:"100%"}}>
          <FlatList
            style={{width:"90%",alignSelf: "center",}}
            data={_data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderResources}
          />
        </View>
      )}
      </View>
      </View>

      {/* <SlidingPane
        closeIcon={<div>Some div containing custom close icon.</div>}
        isOpen={state.isPaneOpenLeft}
        title="Hey, it is optional pane title.  I can be React component too."
        from="left"
        width="200px"
        onRequestClose={() => setState({ isPaneOpenLeft: false })}
      >
        
      </SlidingPane> */}

      </>
    );
}

const styles = StyleSheet.create({
  headerTextLabel:{
    width:"90%",
    height:25,
    marginTop:25,
    marginBottom:25,
    justifyContent:"center",
    paddingTop:50,
  },
  headerTextStyle:{
    fontWeight:'bold',
    fontSize:18,
    color:'#000000',

  },
  header: {
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#006bcc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subHeader:{
    
    alignItems: "flex-start",
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    width: '90%',
   backgroundColor:"black",
   textAlignVertical:"center",
  //  alignSelf: "center",
  //  justifyContent: 'center',  

  },
  location:{
    fontSize: 14,
    color: 'white',
    fontWeight: "bold",
    textAlignVertical:"center",
    
   
  },

  verticleLine:{
    height: '100%',
    width: 1,
    backgroundColor: 'yellow',  

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
