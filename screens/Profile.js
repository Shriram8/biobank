import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Button, Divider, RadioButton } from "react-native-paper";
import { GetUserDataById } from "../src/graphql/queries";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [empId, setEmpId] = useState("");
  const [list, setList] = useState("OTStaff");
  const [checked, setChecked] = useState("male");

  const { data, loading, error } = useQuery(GetUserDataById, {
    variables: {
      userId: props.userId,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setName(data.appUsers[0].name);
      setMobile(data.appUsers[0].uid);
      setEmpId(data.appUsers[0].employeeid);
      setList(data.appUsers[0].userType);
      setChecked(data.appUsers[0].gender);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.formView}>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>First Name Last Name</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput editable={false} style={styles.inputText} value={name} />
        </View>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Gender</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.radioView}>
            <RadioButton
              disabled={true}
              value="Male"
              color={"#006bcc"}
              uncheckedColor={"#959595"}
              status={checked === "male" ? "checked" : "unchecked"}
            />
            <Text style={styles.radioTextStyle}>Male</Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              disabled={true}
              value="Female"
              color={"#006bcc"}
              uncheckedColor={"#959595"}
              status={checked === "female" ? "checked" : "unchecked"}
            />
            <Text style={styles.radioTextStyle}>Female</Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              disabled={true}
              value="Others"
              color={"#006bcc"}
              uncheckedColor={"#959595"}
              status={checked === "others" ? "checked" : "unchecked"}
            />
            <Text style={styles.radioTextStyle}>Others</Text>
          </View>
        </View>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Mobile Number</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput editable={false} style={styles.inputText} value={mobile} />
        </View>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Employee Id</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput editable={false} style={styles.inputText} value={empId} />
        </View>
        <View style={[styles.textLabel, { marginBottom: 10 }]}>
          <Text style={styles.textStyle}>Role</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            editable={false}
            style={styles.inputText}
            value={list.slice(2)}
          />
        </View>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Change password</Text>
        </View>
        <Button
          mode="contained"
          color={"#006bcc"}
          uppercase={false}
          style={styles.submitButton}
          labelStyle={{ fontSize: 16 }}
          onPress={() => {
            props.navigation.navigate("profilepassword");
          }}
        >
          Change password
        </Button>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  radioTextStyle: {
    fontWeight: "bold",
    color: "#333333",
    fontSize: 16,
  },
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
    borderColor: "#959595",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  modalHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 19,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 32,
  },
  submitButton: {
    height: 40,
    marginTop: 12,
    justifyContent: "center",
    width: "90%",
  },
  listHead: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#959595",
    width: "90%",
  },
  listTitle: {
    color: "#959595",
    fontSize: 14,
  },
});
