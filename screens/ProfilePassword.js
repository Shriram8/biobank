import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { Divider, Button } from "react-native-paper";
import { connect } from "react-redux";
import { client } from "../src/graphql/ApolloClientProvider";
import { GetPassword, UpdatePassword } from "../src/graphql/queries";
import { useMutation } from "@apollo/client";

const apolloClient = client;

const ProfilePassword = (props) => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [newFocus, setNewFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  let [updatePass, { data }] = useMutation(UpdatePassword, {
    onCompleted: () => {
      props.navigation.goBack();
    },
    onError: (err) => {
      setShowError(true);
      setErrorMsg("Unable to update password. Please try again later");
    },
  });

  const setUserPassword = () => {
    if (props.route.params?.from === "login") {
      setShowError(false);
      if (newpassword.trim().length > 6) {
        if (newpassword === confirmPassword) {
          updatePass({
            variables: {
              userId: props.route.params?.userId,
              password: newpassword,
              resetpassword: false,
            },
          });
        } else {
          setShowError(true);
          setErrorMsg("Passwords did not match.");
        }
      } else {
        setShowError(true);
        setErrorMsg("Passwords too short.");
      }
    }
  };

  const onSubmit = () => {
    setShowError(false);
    if (newpassword.trim().length > 6) {
      if (newpassword === confirmPassword) {
        apolloClient
          .query({
            query: GetPassword,
            variables: {
              userId: props.userId,
            },
            fetchPolicy: "network-only",
          })
          .then((result) => {
            if (result.data.appUsers[0].password === password) {
              updatePass({
                variables: {
                  userId: props.userId,
                  password: newpassword,
                  resetpassword: false,
                },
              });
            } else {
              setShowError(true);
              setErrorMsg("Current password is worng.");
            }
          });
      } else {
        setShowError(true);
        setErrorMsg("Passwords did not match.");
      }
    } else {
      setShowError(true);
      setErrorMsg("Passwords too short.");
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ marginTop: 33 }}>
          {props.route.params?.from !== "login" && (
            <>
              <View style={styles.textLabel}>
                <Text style={styles.textStyle}>Current password</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry={true}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  style={[
                    styles.inputText,
                    passFocus ? styles.isFocused : styles.isNotFocused,
                    Platform.OS === "web" && { outlineWidth: 0 },
                  ]}
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
            </>
          )}

          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Set a new Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry={true}
              onFocus={() => setNewFocus(true)}
              onBlur={() => setNewFocus(false)}
              style={[
                styles.inputText,
                newFocus ? styles.isFocused : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={setNewPassword}
              value={newpassword}
            />
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Confirm new Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry={true}
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
              style={[
                styles.inputText,
                confirmFocus ? styles.isFocused : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>
        </View>
        {showError && (
          <Text
            style={{
              marginVertical: 16,
              color: "#fa796f",
              fontSize: 14,
              alignSelf: "flex-start",
            }}
          >
            {errorMsg}
          </Text>
        )}
      </ScrollView>
      <Button
        mode="contained"
        color={"#006bcc"}
        uppercase={false}
        style={styles.submitButton}
        onPress={
          props.route.params?.from === "login" ? setUserPassword : onSubmit
        }
      >
        Continue
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(ProfilePassword);

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: "#9e9e9e",
    fontWeight: "bold",
  },
  textLabel: {
    width: "80%",
    height: 20,
    marginTop: 25,
    justifyContent: "center",
    marginBottom: 8,
  },
  inputView: {
    width: "90%",
    borderColor: "#979797",
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    height: 50,
    color: "#170500",
    // borderColor: "#006bda",
    // borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    borderColor: "black",
    width: "90%",
  },
  submitButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    justifyContent: "center",
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
