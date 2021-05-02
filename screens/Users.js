import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import {
  Button,
  IconButton,
  Divider,
  RadioButton,
  List,
  Title,
  Modal,
} from "react-native-paper";
import {
  GetStaffUsers,
  GetInchargeUsers,
  GetAdminUsers,
  addNewUser,
  ENUM_APPUSERS_USERTYPE,
  deleteUser,
} from "../src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Popover from "react-native-popover-view";

const Users = () => {
  const { data: staffData, refetch: staffRefetch } = useQuery(GetStaffUsers);
  const { data: InchargeData, refetch: inchargeRefetch } = useQuery(
    GetInchargeUsers
  );
  const { data: AdminData, refetch: adminRefetch } = useQuery(GetAdminUsers);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [checked, setChecked] = useState("male");
  const [list, setList] = useState("OTStaff");
  const [showPop, setShowPop] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let [usermutate, { data }] = useMutation(addNewUser, {
    onCompleted: () => {
      setAddUser(false);
      refresh(list);
      setName("");
      setMobile("");
    },
    onError: (err) => {
      if (err.message === "Duplicate entry") {
        setShowError(true);
        setErrorMsg("User with this user id already registered");
      }
    },
  });

  let [deleteUserId, { data: deletedUser }] = useMutation(deleteUser, {
    onCompleted: () => {
      refresh(list);
      setShowPop(false);
    },
  });

  const deleteUserFunction = (val) => {
    deleteUserId({
      variables: {
        id: val,
      },
    });
  };

  const refresh = (val) => {
    switch (val) {
      case "OTStaff":
        staffRefetch();
        console.log("REFETCHING STAFF");
        break;
      case "OTIncharge":
        inchargeRefetch();
        console.log("REFETCHING INCHARGE");
        break;
      case "OTAdmin":
        adminRefetch();
        console.log("REFETCHING ADMIN");
        break;
    }
  };

  const renderItem = (data) => {
    return (
      <View style={styles.ItemContainer}>
        <Text style={{ fontSize: 18 }}>{data.item.name}</Text>
        <IconButton
          icon="delete-outline"
          color={"#010101"}
          size={20}
          onPress={() => {
            setShowPop(true);
            setList(data.item.userType);
            setDeleteId(data.item.id);
          }}
        />
      </View>
    );
  };

  const emptyComponent = (val) => {
    return <Text style={styles.empty}>No {val} members</Text>;
  };

  const getuserType = (type) => {
    switch (type) {
      case "OTIncharge":
        return ENUM_APPUSERS_USERTYPE[ENUM_APPUSERS_USERTYPE.OTIncharge];
      case "OTStaff":
        return ENUM_APPUSERS_USERTYPE[ENUM_APPUSERS_USERTYPE.OTStaff];
      case "OTAdmin":
        return ENUM_APPUSERS_USERTYPE[ENUM_APPUSERS_USERTYPE.OTAdmin];
      default:
        break;
    }
  };

  const onSubmit = () => {
    setShowError(false);
    if (mobile.trim() !== "" && name.trim() !== "") {
      usermutate({
        variables: {
          name: name,
          password: Math.random().toString(36).substr(2, 8),
          userType: getuserType(list),
          uid: mobile,
        },
      });
    } else {
      setShowError(true);
      setErrorMsg("Please fill all the fields");
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topView}>
            <Text style={styles.userText}>User</Text>
            <Button
              icon="plus"
              mode="contained"
              color={"#006bcc"}
              uppercase={false}
              style={{ borderRadius: 7 }}
              onPress={() => setAddUser(true)}
            >
              Add
            </Button>
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.title}>Staff</Text>
            <FlatList
              data={staffData?.appUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => emptyComponent("staff")}
            />
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.title}>Incharge</Text>
            <FlatList
              data={InchargeData?.appUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => emptyComponent("incharge")}
            />
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.title}>Admin</Text>
            <FlatList
              data={AdminData?.appUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => emptyComponent("admin")}
            />
          </View>
        </View>
      </ScrollView>
      <Popover
        popoverStyle={styles.popsStyle}
        isVisible={showPop}
        onRequestClose={() => setShowPop(false)}
      >
        <Title style={styles.heading}>Remove user</Title>
        <Text style={styles.text}>Are you sure to remove the user?</Text>
        <View style={styles.buttonView}>
          <Button
            mode="contained"
            color={"#006bcc"}
            labelStyle={{ color: "#fff" }}
            onPress={() => setShowPop(false)}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            labelStyle={{ color: "#fff" }}
            color={"#A9A9A9"}
            onPress={() => deleteUserFunction(deleteId, list)}
          >
            Delete
          </Button>
        </View>
      </Popover>
      <Modal
        animationType="slide"
        visible={addUser}
        onDismiss={() => {
          setAddUser(false);
        }}
      >
        <View style={styles.modalHeader}>
          <IconButton
            icon="chevron-left"
            color={"#010101"}
            size={22}
            style={{ position: "absolute", left: 18 }}
            onPress={() => {
              setAddUser(false);
            }}
          />
          <Text style={styles.headerTitle}>Add a New User</Text>
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
            <Text style={styles.textStyle}>UserID/email/MobileNumber</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              onChangeText={setMobile}
              value={mobile}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={{ marginVertical: 32 }}>
            <View style={[styles.textLabel, { marginBottom: 10 }]}>
              <Text style={styles.textStyle}>Role</Text>
            </View>
            <List.Accordion
              title={list.slice(2)}
              style={styles.listHead}
              titleStyle={styles.listTitle}
            >
              <List.Item title="Staff" onPress={() => setList("OTStaff")} />
              <List.Item
                title="Incharge"
                onPress={() => setList("OTIncharge")}
              />
              <List.Item title="Admin" onPress={() => setList("OTAdmin")} />
            </List.Accordion>
          </View>
          {showError && (
            <Text
              style={{ color: "red", textAlign: "center", paddingVertical: 15 }}
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
          Add New User
        </Button>
      </Modal>
    </>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  ItemContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 18,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    paddingVertical: 20,
  },
  topView: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  userText: {
    fontSize: 18,
    paddingLeft: 1,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 18,
    marginLeft: 17,
    fontSize: 18,
    fontWeight: "bold",
  },
  marginTop: {
    marginTop: 20,
  },
  modalHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
  popsStyle: {
    width: "80%",
    paddingVertical: 20,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  text: {
    textAlign: "center",
    paddingVertical: 20,
  },
  heading: {
    textAlign: "center",
  },
});
