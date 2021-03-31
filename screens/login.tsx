import * as React from 'react';
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, TextInput, TouchableOpacity ,Image} from 'react-native';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

export default function login() {
   return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#0054aa"
        hidden={false} />
        <ScrollView contentContainerStyle={{backgroundColor:'#ffffff',flex:1}} 
        keyboardShouldPersistTaps='handled'>
      
       <View style={styles.header}>
       <Image
          style={styles.tinyLogo}
          source={require('../Images/logo.png')}
        />
        </View>
      <View style={styles.container}>
        <View style={styles.textLabel} >
            <Text style={styles.textStyle}>Email/userId</Text>
        </View>
        <View style={styles.inputView} >
         
        <TextInput  
            style={styles.inputText}
            placeholder="UserID" 
            placeholderTextColor="#003f5c"
        />
        </View>
        <View style={styles.textLabel} >
            <Text style={styles.textStyle}>Password</Text>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
      </>
    );
}

const styles = StyleSheet.create({
  header: {
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop:150,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    resizeMode:"contain",
    width:200
  },
  textStyle:{
    fontWeight:'bold',
    fontSize:16
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  textLabel:{
    width:"80%",
    height:20,
    marginBottom:15,
    justifyContent:"center",
  },
  inputView:{
    width:"80%",
    borderColor:"#979797",
    borderWidth:1.5,
    borderRadius:6,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    fontWeight:'bold',
    height:50,
    color:"#170500"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#0054aa",
    borderRadius:6,
    height:50,
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontWeight:'bold',
    fontSize:18,
    textAlign: "center",
  }
});
