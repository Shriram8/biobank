import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
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
  const [nameFocus, setNameFocus] = useState(false);
  const [EmpIdFocus, setEmpIdFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [listFocus, setListFocus] = useState(false);

  let [usermutate, { data }] = useMutation(addNewUser, {
    onCompleted: (data) => {
      navigateToUsers(
        data.createAppUser.appUser.branch.id,
        "User successfully added"
      );
    },
    onError: (err) => {
      if (err.message === "Duplicate entry") {
        setShowError(true);
        setErrorMsg("User with this user id already registered");
      } else {
        setShowError(true);
        setErrorMsg("Failed to add user. Please try again later");
      }
    },
  });

  let [reset, { data: resetPasswordData }] = useMutation(ResetPassword, {
    onCompleted: (data) => {
      navigateToUsers(
        data.updateAppUser.appUser.branch.id,
        "Password reset enabled for the user"
      );
    },
  });

  let [update, { data: updateUserData }] = useMutation(UpdateUser, {
    onCompleted: (data) => {
      navigateToUsers(
        data.updateAppUser.appUser.branch.id,
        "User details updated"
      );
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
    if (mobile.length > 9 && name !== "" && empId !== "") {
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
          branch: props.route.params?.branch,
        },
      });
    } else {
      setShowError(true);
      setErrorMsg("Please fill all the fields correctly");
    }
  };

  const toUpdate = () => {
    setShowError(false);
    if (mobile !== "" && name !== "" && empId !== "") {
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
      switch (props.userType) {
        case "OTSuperUser":
          return true;
        case "OTStaff":
          return false;
        case "OTIncharge":
          if (props.route.params?.userType === "OTStaff") {
            return true;
          } else {
            return false;
          }
        case "OTAdmin":
          if (props.route.params?.userType !== "OTAdmin") {
            return true;
          } else {
            return false;
          }
      }
    }
  };

  const createUserTypeValidation = (val) => {
    switch (props.userType) {
      case "OTSuperUser":
        return true;
      case "OTStaff":
        return false;
      case "OTIncharge":
        if (val === "OTStaff") {
          return true;
        } else {
          return false;
        }
      case "OTAdmin":
        if (val !== "OTAdmin") {
          return true;
        } else {
          return false;
        }
    }
  };

  const navigateToUsers = (id, msg) => {
    props.navigation.navigate("users", {
      from: "adduser",
      branch: id,
      msg: msg,
    });
  };

  const numericValidator = (str) => {
    const phNumFormat = /^[0-9]*$/g;
    if (str.match(phNumFormat)) {
      setMobile(str);
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" hidden={false} />
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <View
          style={[
            styles.modalHeader,
            Platform.OS === "web" && {
              borderBottomWidth: 1,
              borderBottomColor: "#E0E0E0",
              paddingVertical: 20,
            },
          ]}
        >
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
              editable={checkUser()}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              style={[
                styles.inputText,
                nameFocus && props.route.params?.branch
                  ? styles.isFocused
                  : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={setName}
              value={name}
            />
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Gender</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.radioView}>
              <RadioButton
                disabled={!props.route.params?.from ? false : !checkUser()}
                value="Male"
                color={"#006bcc"}
                uncheckedColor={"#959595"}
                status={checked === "male" ? "checked" : "unchecked"}
                onPress={() => setChecked("male")}
              />
              <Text style={styles.radioTextStyle}>Male</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton
                disabled={!props.route.params?.from ? false : !checkUser()}
                value="Female"
                color={"#006bcc"}
                uncheckedColor={"#959595"}
                status={checked === "female" ? "checked" : "unchecked"}
                onPress={() => setChecked("female")}
              />
              <Text style={styles.radioTextStyle}>Female</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton
                disabled={!props.route.params?.from ? false : !checkUser()}
                value="Others"
                color={"#006bcc"}
                uncheckedColor={"#959595"}
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
              keyboardType={"number-pad"}
              maxLength={10}
              editable={checkUser()}
              onFocus={() => setMobileFocus(true)}
              onBlur={() => setMobileFocus(false)}
              style={[
                styles.inputText,
                mobileFocus && props.route.params?.branch
                  ? styles.isFocused
                  : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={numericValidator}
              value={mobile}
            />
          </View>
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>Employee Id</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              editable={checkUser()}
              onFocus={() => setEmpIdFocus(true)}
              onBlur={() => setEmpIdFocus(false)}
              style={[
                styles.inputText,
                EmpIdFocus && props.route.params?.branch
                  ? styles.isFocused
                  : styles.isNotFocused,
                Platform.OS === "web" && { outlineWidth: 0 },
              ]}
              onChangeText={setEmpId}
              value={empId}
            />
          </View>
          <View style={[styles.textLabel, { marginBottom: 10 }]}>
            <Text style={styles.textStyle}>Role</Text>
          </View>
          <List.Accordion
            onPress={() => setListFocus(!listFocus)}
            expanded={checkUser()}
            title={list.slice(2)}
            style={[
              styles.listHead,
              !props.route.params?.from && listFocus
                ? styles.isFocused
                : styles.isNotFocused,
              Platform.OS === "web" && { outlineWidth: 0 },
            ]}
            titleStyle={styles.listTitle}
          >
            <List.Item
              title="Staff"
              titleStyle={{ color: "#959595" }}
              onPress={() => setList("OTStaff")}
            />
            {createUserTypeValidation("OTIncharge") && (
              <List.Item
                title="Incharge"
                titleStyle={{ color: "#959595" }}
                onPress={() => setList("OTIncharge")}
              />
            )}
            {createUserTypeValidation("OTAdmin") && (
              <List.Item
                title="Admin"
                titleStyle={{ color: "#959595" }}
                onPress={() => setList("OTAdmin")}
              />
            )}
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
                labelStyle={{ fontSize: 16 }}
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
        {checkUser() && (
          <Button
            mode="contained"
            color={"#006bcc"}
            uppercase={false}
            style={styles.submitButton}
            onPress={toUpdate}
          >
            Update user
          </Button>
        )}
        {!props.route.params?.from && (
          <Button
            mode="contained"
            color={"#006bcc"}
            uppercase={false}
            style={styles.submitButton}
            labelStyle={{ fontSize: 16 }}
            onPress={onSubmit}
          >
            Add a New User
          </Button>
        )}
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId,
  userType: state.userType,
});

export default connect(mapStateToProps)(AddUser);

const styles = StyleSheet.create({
  radioTextStyle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333333",
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
    fontSize: 16,
    // borderColor: "#006bda",
    // borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  modalHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  listHead: {
    // borderColor: "#959595",
    // borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    width: "90%",
  },
  listTitle: {
    color: "#170500",
    fontSize: 16,
  },
  reset: {
    width: "100%",
    height: 40,
    marginTop: 10,
    marginBottom: 20,
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
