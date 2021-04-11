import React, { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet,ScrollView, Keyboard, Text,TouchableWithoutFeedback, StatusBar,View, 
  TextInput, TouchableOpacity ,Image} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import {client} from '../src/graphql/ApolloClientProvider';
import {GetUserDetails} from '../src/graphql/queries';
import { Divider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { changeUserLogin } from '../src/Actions/UserLogin';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';



const apolloClient = client;
const LoginRootStack = createStackNavigator();
function login(props,navigation) {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const verifyLogin=()=>{
   apolloClient
        .query({
          query: GetUserDetails,
          variables:{
            userID:parseInt(userId)
          }
        })
        .then((Result) => {

          if(Result.data.appUser.password === password){
            props.changeLogin();
            console.log("Login state----",props.isLoggedIn);
            navigation.navigate('homeScreen')
          }
          else{
            console.log("failed");
          }
        })
        .catch(() => { });
  }

  return (  
       <>
       <StatusBar
        animated={true}
        backgroundColor="#006bcc"
        hidden={false} />
        <ScrollView contentContainerStyle={{backgroundColor:'#006bcc',flex:1}} 
        keyboardShouldPersistTaps='handled'>
       <View style={styles.header}>
       <Image
          style={styles.tinyLogo}
          source={require('../Images/logo.png')}
        />
        </View>
      <View style={styles.container}>
        <View style={styles.headerTextLabel} >
        <Text style={styles.headerTextStyle}>Welcome.</Text>
        </View>
        <Divider style={{width:"80%",height:1,borderColor:'black',marginTop:25}}/>
        <View style={styles.textLabel} >
            <Text style={styles.textStyle}>Email/userId</Text>
        </View>
        <View style={styles.inputView} >
        <TextInput  
            style={styles.inputText}
            onChangeText={(input) => setUserId(input)}
            value = {userId}
        />
        </View>
        <Divider style={{width:"80%",height:1,borderColor:'black'}}/>
        <View style={styles.textLabel} >
            <Text style={styles.textStyle}>Password</Text>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            onChangeText={(input) => setPassword(input)}
            value = {password}
            />
        </View>
        <Divider style={{width:"80%",height:1,borderColor:'black'}}/>
        <TouchableOpacity style={styles.loginBtn} onPress={verifyLogin}>
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
  tinyLogo: {
    resizeMode:"contain",
    width:200
  },
  headerTextLabel:{
    width:"80%",
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
  textStyle:{
    fontWeight:'bold',
    fontSize:12,
    color:'#9e9e9e'
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
    marginTop:25,
    justifyContent:"center",
  },
  inputView:{
    width:"80%",
    borderColor:"#979797",
    height:50,
    justifyContent:"center",
  },
  inputText:{
    fontWeight:'bold',
    height:50,
    color:"#170500",
    backgroundColor:"#ffffff",
    fontSize:12,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#0054aa",
    borderRadius:6,
    height:50,
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    elevation: 6,
  },
  loginText:{
    color:"white",
    fontWeight:'bold',
    fontSize:18,
    textAlign: "center",
  }
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin:()=>dispatch({type:'CHANGE_LOGIN'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(login);