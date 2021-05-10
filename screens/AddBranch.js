import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Platform,
} from "react-native";
import { Divider } from "react-native-paper";
import { Button } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { addNewBranch } from "../src/graphql/queries";

const AddBranch = (props) => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [nameFocus, setNameFocus] = useState(false);

  let [branchmutate, { data }] = useMutation(addNewBranch, {
    onCompleted: () => {
      props.navigation.navigate("branches", {
        from: "addbranch",
      });
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
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            style={[
              styles.inputText,
              nameFocus ? styles.isFocused : styles.isNotFocused,
              Platform.OS === "web" && { outlineWidth: 0 },
            ]}
            onChangeText={setName}
            value={name}
          />
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
        labelStyle={{ fontSize: 16 }}
        onPress={onSubmit}
      >
        Add a New Branch
      </Button>
    </View>
  );
};
export default AddBranch;

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
  formView: {
    backgroundColor: "#fff",
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
