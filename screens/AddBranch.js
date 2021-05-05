import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TextInput, Text } from "react-native";
import { Divider } from "react-native-paper";
import { Button } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { addNewBranch } from "../src/graphql/queries";

const AddBranch = (props) => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let [branchmutate, { data }] = useMutation(addNewBranch, {
    onCompleted: () => {
      props.navigation.goBack();
    },
    onError: (err) => {
      if (err.message === "Duplicate entry") {
        setShowError(true);
        setErrorMsg("Branch already exists");
      }
    },
  });

  const onSubmit = () => {
    if (name !== "") {
      branchmutate({
        variables: {
          name: name,
        },
      });
    } else {
      setShowError(true);
      setErrorMsg("Please fill all the fields");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.formView}>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Branch Name</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={setName}
            value={name}
          />
        </View>
        <Divider style={styles.divider} />
        {showError && (
          <Text
            style={{
              color: "#fa796f",
              textAlign: "center",
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
        Add a New Branch
      </Button>
    </View>
  );
};
export default AddBranch;

const styles = StyleSheet.create({
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
  formView: {
    backgroundColor: "#f1f1f1",
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 27,
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
