import React, { useState, useRef, useEffect } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetResourcesDetails} from '../src/graphql/queries';
import { Divider } from 'react-native-paper';
import { FlatList } from "react-native";

const apolloClient = client;
export default function homeScreen() {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
    const { loading, error, refetch, data } = useQuery(GetResourcesDetails); 
    if(data){
        console.log("Data",data.appResources);
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
        <Text style={styles.title}>{item.name}</Text>
    </View>
    );
  };


  return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        <ScrollView contentContainerStyle={{backgroundColor:'#006bcc',flex:1}} 
        keyboardShouldPersistTaps='handled'>
        <View style={styles.header}>
        </View>
        <Text>Todays Progress</Text>
        <View style={styles.container}>
        {data && (
        <View>
          <FlatList
            
            data={data.appResources}
            keyExtractor={(item, index) => item.id}
            renderItem={renderResources}
          />
        </View>
      )}
        </View>
        </ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
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
    flex:6,
    borderTopLeftRadius:30
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
