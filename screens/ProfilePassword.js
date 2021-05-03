import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
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

  let [updatePass, { data }] = useMutation(UpdatePassword, {
    onCompleted: () => {
      props.navigation.goBack();
    },
    onError: (err) => {
      setShowError(true);
      setErrorMsg("Unable to update password. Please try again later");
    },
  });

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
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
      >
        <View style={{ marginTop: 33 }}>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Current password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputText}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Set a new Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputText}
              onChangeText={setNewPassword}
              value={newpassword}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Confirm new Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputText}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>
          <Divider style={styles.divider} />
        </View>
        {showError && (
          <Text
            style={{
              color: "#fa796f",
              paddingVertical: 15,
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
        onPress={onSubmit}
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
    fontWeight: "bold",
    fontSize: 12,
    color: "#9e9e9e",
  },
  textLabel: {
    width: "90%",
    height: 20,
    marginTop: 25,
    justifyContent: "center",
  },
  inputView: {
    width: "90%",
    borderColor: "#979797",
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontWeight: "bold",
    height: 50,
    color: "#333333",
    fontSize: 12,
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
});
