import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import {
  Button,
  Divider,
  RadioButton,
  List,
  IconButton,
} from "react-native-paper";
import {
  addNewUser,
  GetUserDataById,
  ResetPassword,
  UpdateUser,
} from "../src/graphql/queries";
import { useMutation } from "@apollo/client";
import { client } from "../src/graphql/ApolloClientProvider";
import { connect } from "react-redux";

const apolloClient = client;

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [empId, setEmpId] = useState("");
  const [list, setList] = useState("OTStaff");
  const [checked, setChecked] = useState("male");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let [usermutate, { data }] = useMutation(addNewUser, {
    onCompleted: () => {
      props.navigation.goBack();
    },
    onError: (err) => {
      if (err.message === "Duplicate entry") {
        setShowError(true);
        setErrorMsg("User with this user id already registered");
      }
    },
  });

  let [reset, { data: resetPasswordData }] = useMutation(ResetPassword, {
    onCompleted: () => {
      props.navigation.goBack();
    },
  });

  let [update, { data: updateUserData }] = useMutation(UpdateUser, {
    onCompleted: () => {
      props.navigation.goBack();
    },
  });

  useEffect(() => {
    if (props.route.params?.from === "admin") {
      apolloClient
        .query({
          query: GetUserDataById,
          variables: {
            userId: props.route.params.userId,
          },
          fetchPolicy: "network-only",
        })
        .then((result) => {
          setName(result.data.appUsers[0].name);
          setMobile(result.data.appUsers[0].uid);
          setEmpId(result.data.appUsers[0].employeeid);
          setList(result.data.appUsers[0].userType);
          setChecked(result.data.appUsers[0].gender);
        });
    }
  }, [props.route.params]);

  const onSubmit = () => {
    setShowError(false);
    if (mobile.trim() !== "" && name.trim() !== "" && empId.trim !== "") {
      usermutate({
        variables: {
          name: name,
          password: Math.random().toString(36).substr(2, 8),
          userType: list,
          uid: mobile,
          gender: checked,
          employeeid: empId,
          active: true,
          resetpassword: true,
        },
      });
    } else {
      setShowError(true);
      setErrorMsg("Please fill all the fields");
    }
  };

  const toUpdate = () => {
    setShowError(false);
    if (mobile.trim() !== "" && name.trim() !== "" && empId.trim !== "") {
      update({
        variables: {
          name: name,
          userType: list,
          uid: mobile,
          gender: checked,
          userId: props.route.params?.userId,
        },
      });
    } else {
      setShowError(true);
      setErrorMsg("Please fill all the fields");
    }
  };

  const checkUser = () => {
    if (props.route.params?.from) {
      if (props.userType !== "OTStaff") {
        if (props.route.params?.userType === "OTStaff") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.modalHeader}>
        <IconButton
          icon="arrow-left"
          color={"#010101"}
          size={25}
          style={{ position: "absolute", left: 2 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>
          {props.route.params?.from ? "Update user" : "Add a New User"}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.formView}>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>First Name Last Name</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={setName}
            value={name}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Gender</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.radioView}>
            <RadioButton
              value="Male"
              color={"#006bcc"}
              status={checked === "male" ? "checked" : "unchecked"}
              onPress={() => setChecked("male")}
            />
            <Text style={styles.radioTextStyle}>Male</Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              value="Female"
              color={"#006bcc"}
              status={checked === "female" ? "checked" : "unchecked"}
              onPress={() => setChecked("female")}
            />
            <Text style={styles.radioTextStyle}>Female</Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              value="Others"
              color={"#006bcc"}
              status={checked === "others" ? "checked" : "unchecked"}
              onPress={() => setChecked("others")}
            />
            <Text style={styles.radioTextStyle}>Others</Text>
          </View>
        </View>
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Mobile Number</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={setMobile}
            value={mobile}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textLabel}>
          <Text style={styles.textStyle}>Employee Id</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={setEmpId}
            value={empId}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.textLabel, { marginBottom: 10 }]}>
          <Text style={styles.textStyle}>Role</Text>
        </View>
        <List.Accordion
          title={list.slice(2)}
          style={styles.listHead}
          titleStyle={styles.listTitle}
        >
          <List.Item title="Staff" onPress={() => setList("OTStaff")} />
          <List.Item title="Incharge" onPress={() => setList("OTIncharge")} />
          <List.Item title="Admin" onPress={() => setList("OTAdmin")} />
        </List.Accordion>
        {checkUser() && (
          <>
            <View style={styles.textLabel}>
              <Text style={styles.textStyle}>Set a new password</Text>
            </View>
            <Button
              mode="contained"
              color={"#006bcc"}
              uppercase={false}
              style={styles.reset}
              onPress={() => {
                reset({
                  variables: {
                    userId: props.route.params?.userId,
                    resetpassword: true,
                  },
                });
              }}
            >
              Reset Password
            </Button>
          </>
        )}
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
        onPress={props.route.params?.from ? toUpdate : onSubmit}
      >
        {props.route.params?.from ? "Update user" : "Add a New User"}
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId,
  userType: state.userType,
});

export default connect(mapStateToProps)(AddUser);

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#9e9e9e",
  },
  radioTextStyle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#333333",
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
  modalHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
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
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 32,
  },
  submitButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    justifyContent: "center",
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
  reset: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    justifyContent: "center",
  },
});
