import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { client } from "../src/graphql/ApolloClientProvider";
import {
  GetUserDetails,
  GetDetailsWithEmployeeId,
  GetDActues,
} from "../src/graphql/queries";
import { Divider, HelperText, Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { changeUserLogin } from "../src/Actions/UserLogin";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { db_url } from "../src/Constants/login";
import CsvDownload from 'react-json-to-csv';
import { Linking} from 'react-native';

import {
  JsonToCsv,
  useJsonToCsv
} from 'react-json-csv';

const apolloClient = client;
const LoginRootStack = createStackNavigator();

function login(props, navigation) {
  const [userId, setUserId] = useState("");
  const [EmpIdFocus, setEmpIdFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showHelperText, setShowHelperText] = useState(false);
  const [register, setRegister] = useState(false);
  const [mockData, setmockData] = useState(
    [
      {
        "age": 51,
        "record_id": "CoBIO-A0100"
      },
      {
        "age": 61,
        "record_id": "CoBIO-A0101 "
      },
      {
        "age": 64,
        "record_id": "CoBIO-A0102"
      },
    ]
  );
  const [forgot, setForgot] = useState(false);
  const axios = require('axios').default;
  
  const verifyLogin = () => {
    if (password.trim().length != "" && userId.trim().length != "") {
      apolloClient
        .query({
          query: GetDetailsWithEmployeeId,
          variables: {employeeid:userId},
          fetchPolicy: "network-only",
        })
        .then((Result) => {
          // setmockData(Result.data.dAcutes);
          console.log("Result--",Result.data)
          if (Result.data.appUsers[0].password === password) {
            props.changeLogin(
              Result.data.appUsers[0].name,
              Result.data.appUsers[0].userType,
            );
            navigation.navigate("homeScreen", {
              userId:userId,
              userName: userId,
              userType: Result.data.appUsers[0].userType,
            });
          } else {
            setShowHelperText(true);
            setErrorMsg("Username and password didn???t match.");
          }
        })
        .catch(() => {
          setShowHelperText(true);
          setErrorMsg("Username and password didn???t match.");
        });
  };
}

  const getUserDetails = () => {
    axios({
      method: 'post', 
      url: db_url+'/users-permissions/getUserDetails',
      data: {
        employeeid: userId,
        password:password
      }
    }).then((Result)=>{
       if(Result.data.appUsers){
            if (Result.data.appUsers.length>0) {
              if (Result.data?.appUsers[0]?.resetpassword === true) {
                props.navigation.navigate("setPassword", {
                  from: "login",
                  userId: Result.data.appUsers[0].id,
                });
                setRegister(false);
              } else if(Result.data?.appUsers[0]?.resetpassword === false) {
                  setShowHelperText(true);
                  setErrorMsg("You are not allowed to reset password"); 
              }
            }

          } else{
            if(!Result.data.login)
            {
              setShowHelperText(true);
              setErrorMsg("Mobile/employee ID not found");
            }else{
              setShowHelperText(true);
              setErrorMsg("Request failed! Please try later.");
            }
          }
    }).catch((err)=>{ 
      
    });

    // if (userId.trim() !== "") {
    //   apolloClient
    //     .query({
    //       query: GetDetailsWithEmployeeId,
    //       variables: {
    //         employeeid: userId,
    //       },
    //       fetchPolicy: "network-only",
    //     })
    //     .then((Result) => {
    //       console.log("result", Result);
    //       if (Result.data.appUsers[0]?.resetpassword === true) {
    //         props.navigation.navigate("setPassword", {
    //           from: "login",
    //           userId: Result.data.appUsers[0].id,
    //         });
    //         setRegister(false);
    //       } else {
    //         setShowHelperText(true);
    //         setErrorMsg("You are not allowed to reset password");
    //       }
    //       if (Result.data.appUsers.length === 0) {
    //         setShowHelperText(true);
    //         setErrorMsg("Mobile/employee ID not found");
    //       }
    //     });
    // }
  };

  const rendereHeaderText = () => {
    if (register && !forgot) return "New user registration";
    if (forgot && !register) return "Enter your login ID";
    if (!register && !forgot) return "Welcome";
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#3c7d4d" hidden={false} />
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#3c7d4d", flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        

      <View style={styles.header}>
        <View style={{ flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor:"#a0a39d"}}><Image
            resizeMode={"contain"}
            style={styles.tinyLogo}
            source={require("../Images/logo.png")}/>
          </View>
          <View style={{alignItems: 'center',
              justifyContent: 'flex-end',
              }}>
            <Text style={{fontSize: 70,
            fontWeight:'bold',
            color: "#ffffff",
            marginVertical: 16}}>NoCo CoBIO</Text>
            <Text style={{fontSize: 25,
            fontWeight:'bold',
            color: "#ffffff",
            marginVertical: 16}}>Northern Colorado Coronavirus Biobank</Text>
          </View>

        <View style={{ flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginStart:10}}>
         {/* <Button
            mode="contained"
            color={"#2d6b9e"}
            uppercase={false}
            style={styles.reset1}
            labelStyle={{ fontSize: 12,marginRight:25}}
            onPress={() => {
             // <a href="https://google.com" target="_blank">CSV</a>
              Linking.openURL('https://clinicaltrials.gov/');
            }}
          >  </Button> */}
          <Text style={{fontSize: 30,
            color: "#55b9e3", fontWeight: 'bold'
            }}>NCT04603677</Text>
          <Text style={{textDecorationLine: 'underline', color: '#55b9e3', fontSize:30, fontWeight: 'bold'}}
            onPress={() => Linking.openURL('https://clinicaltrials.gov/')}>
           https://clinicaltrials.gov/
          </Text>
        </View>
      </View>
     <View style={styles.container}>
          <View style={styles.headerTextLabel}>
            <Text style={styles.headerTextStyle}>{rendereHeaderText()}</Text>
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Login ID</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              onFocus={() => setEmpIdFocus(true)}
              onBlur={() => setEmpIdFocus(false)}
              style={[
                styles.inputText,
                EmpIdFocus ? styles.isFocused : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={(input) => setUserId(input)}
              value={userId}
            />
          </View>
          {!register && !forgot && (
            <>
              <View style={styles.textLabel}>
                <Text style={styles.textStyle}>Password</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  style={[
                    styles.inputText,
                    passwordFocus ? styles.isFocused : styles.isNotFocused,
                    Platform.OS === "web" && { outlineWidth: 0 },
                  ]}
                  onChangeText={(input) => setPassword(input)}
                  value={password}
                />
              </View>
            </>
          )}
          <View style={{ width: "80%" }}>
            <Text
              type="error"
              visible={showHelperText}
              style={styles.errorText}
            >
              {showHelperText && errorMsg}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={styles.loginBtn}
            onPress={forgot || register ? getUserDetails : verifyLogin}
          >
            <Text style={styles.loginText}>Continue</Text>
          </TouchableOpacity> */}

          <Button
            mode="contained"
            color={"#3c7d4d"}
            uppercase={false}
            style={styles.reset1}
            labelStyle={{ fontSize: 16 }}
            onPress={forgot || register ? getUserDetails : verifyLogin}
          >
            Continue
          </Button>
          {(forgot || register) && (
            <Text
              style={styles.register}
              onPress={() => {
                setForgot(false);
                setRegister(false);
                setShowHelperText(false);
              }}
            >
              Login
            </Text>
          )}
          {!register && (
            <Text
              style={styles.register}
              onPress={() => {
                setRegister(true);
                setForgot(false);
                setShowHelperText(false);
              }}
            >
              First Time Login/Registration
            </Text>
          )}
          {!forgot && (
            <Text
              style={styles.register}
              onPress={() => {
                setForgot(true);
                setRegister(false);
                setShowHelperText(false);
              }}
            >
              Forgot Password
            </Text>
          )}
        </View>
        {/* <Divider style={{ width: "80%", height: 1, borderColor: "black" }} /> */}
      <CsvDownload 
        data={mockData}
        filename="good_expo_data.csv"
      >
        Good Data ???
      </CsvDownload>
      {/* <JsonToCsv
  data={data}
  filename={filename}
  fields={fields}
  style={style}
  text={text}
/> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#3c7d4d",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  // topHeader:{
  //   alignItems: "center",
  //   justifyContent: 'flex-end',
  //   flex: 1,
  // },

  container: {
    marginTop: 75,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 6,
    borderTopLeftRadius: 30,
  },
  tinyLogo: {
    height: 96,
    width: 416,
    marginTop: 75,
  },
  headerTextLabel: {
    width: "40%",
    height: 32,
    marginTop: 32,
    justifyContent: "center",
  },
  headerTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
  },
  textStyle: {
    fontSize: 14,
    color: "#9e9e9e",
    fontWeight: "bold",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  textLabel: {
    width: "40%",
    height: 20,
    marginTop: 25,
    justifyContent: "center",
    marginBottom: 8,
  },
  inputView: {
    width: "40%",
    borderColor: "#979797",
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontWeight: "bold",
    height: 50,
    color: "#170500",
    backgroundColor: "#ffffff",
    // borderColor: "#006bda",
    // borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  // loginBtn: {
  //   width: "80%",
  //   backgroundColor: "#0054aa",
  //   borderRadius: 6,
  //   height: 50,
  //   justifyContent: "center",
  //   // marginTop: 40,
  //   marginBottom: 10,
  //   elevation: 2,
  // },
  // loginText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 16,
  //   textAlign: "center",
  // },
  register: {
    marginTop: 27,
    textAlign: "center",
    color: "#9e9e9e",
    fontSize: 16,
  },
  reset1: {
    width: "12%",
    height: 40,
    textAlign:"left",
    marginRight: 20,
    justifyContent: "center",
  },
  
  reset: {
    width: "12%",
    height: 40,
   
    marginBottom: 20,
    justifyContent: "center",
  },
  errorText: {
    marginVertical: 16,
    color: "#fa796f",
    fontSize: 14,
    alignSelf: "flex-start",
  },
  isFocused: {
    borderColor: "#006bda",
    borderWidth: 2,
  },
  isNotFocused: {
    marginBottom: 1,
    borderColor: "#959595",
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: (userId, userType, branch, userName, jwtToken) =>
      dispatch({
        type: "CHANGE_LOGIN",
        payload: {
          userId,
          userType,
          branch,
          userName,
          jwtToken
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
