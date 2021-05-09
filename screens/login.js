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
} from "../src/graphql/queries";
import { Divider, HelperText, Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { changeUserLogin } from "../src/Actions/UserLogin";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

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
  const [forgot, setForgot] = useState(false);
  const verifyLogin = () => {
    if (password.trim().length != "" && userId.trim().length != "") {
      apolloClient
        .query({
          query: GetDetailsWithEmployeeId,
          variables: {
            employeeid: userId,
            // userID: userId,
          },
          fetchPolicy: "network-only",
        })
        .then((Result) => {
          console.log("result", Result.data.appUsers[0].branch);
          if (Result.data.appUsers[0].password === password) {
            props.changeLogin(
              Result.data.appUsers[0].id,
              Result.data.appUsers[0].userType,
              Result.data.appUsers[0].branch?.id
            );
            navigation.navigate("homeScreen", {
              userId: userId,
              userType: Result.data.appUsers[0].userType,
            });
          } else {
            console.log("failed");
            setShowHelperText(true);
            setErrorMsg("Username and password didn’t match.");
          }
        })
        .catch(() => {
          setShowHelperText(true);
          setErrorMsg("Username and password didn’t match.");
        });
    } else {
      setShowHelperText(true);
      setErrorMsg("Please fill all the fields.");
    }
  };

  const getUserDetails = () => {
    if (userId.trim() !== "") {
      apolloClient
        .query({
          query: GetDetailsWithEmployeeId,
          variables: {
            employeeid: userId,
          },
          fetchPolicy: "network-only",
        })
        .then((Result) => {
          console.log("result", Result);
          if (Result.data.appUsers[0]?.resetpassword === true) {
            props.navigation.navigate("setPassword", {
              from: "login",
              userId: Result.data.appUsers[0].id,
            });
            setRegister(false);
          } else {
            setShowHelperText(true);
            setErrorMsg("You are not allowed to reset password");
          }
          if (Result.data.appUsers.length === 0) {
            setShowHelperText(true);
            setErrorMsg("Mobile/employee ID not found");
          }
        });
    }
  };

  const rendereHeaderText = () => {
    if (register && !forgot) return "New user registration";
    if (forgot && !register) return "Enter your login ID";
    if (!register && !forgot) return "Welcome";
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#006bcc" hidden={false} />
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#006bcc", flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            resizeMode={"contain"}
            style={styles.tinyLogo}
            source={require("../Images/logo.png")}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.headerTextLabel}>
            <Text style={styles.headerTextStyle}>{rendereHeaderText()}</Text>
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Mobile No/Employee ID</Text>
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
            color={"#006bcc"}
            uppercase={false}
            style={styles.reset}
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#006bcc",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    marginTop: 75,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 6,
    borderTopLeftRadius: 30,
  },
  tinyLogo: {
    height: 48,
    width: 208,
    marginTop: 75,
  },
  headerTextLabel: {
    width: "80%",
    height: 25,
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
    width: "80%",
    height: 20,
    marginTop: 25,
    justifyContent: "center",
    marginBottom: 8,
  },
  inputView: {
    width: "80%",
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
  reset: {
    width: "80%",
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
    changeLogin: (userId, userType, branch) =>
      dispatch({
        type: "CHANGE_LOGIN",
        payload: {
          userId,
          userType,
          branch,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
