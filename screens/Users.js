import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  StatusBar,
  Platform,
} from "react-native";
import { Button, IconButton, Portal } from "react-native-paper";
import { GetUsers } from "../src/graphql/queries";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import DeletePopup from "./DeletePopup";

const Users = (props) => {
  const [sectionData, setSectionData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertmsg] = useState("");
  const [branchName, setBranchName] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState([]);

  const { data, refetch } = useQuery(GetUsers, {
    fetchPolicy: "network-only",
    variables: {
      branch:
        props.route.params?.from === "branches" ||
        props.route.params?.from === "adduser"
          ? props.route.params?.branch
          : props.branch,
    },
  });

  useEffect(() => {
    if (props.userType === "OTSuperUser") {
      setBranchName(props.route.params?.branchName);
    } else {
      setBranchName(props.branchName);
    }
    if (props.route.params?.from === "adduser") {
      refetch();
      setAlertmsg(props.route.params?.msg);
      setAlert(true);
    }
  }, [props.route.params]);

  const DATA = [
    {
      title: "Staff",
      data: [],
    },
    {
      title: "Incharge",
      data: [],
    },
    {
      title: "Doctor",
      data: [],
    },
    {
      title: "Admin",
      data: [],
    },
  ];

  useEffect(() => {
    if (data) {
      for (let index = 0; index < data.appUsers.length; index++) {
        switch (data.appUsers[index].userType) {
          case "OTStaff":
            DATA[0].data.push(data.appUsers[index]);
            break;
          case "OTIncharge":
            DATA[1].data.push(data.appUsers[index]);
            break;
          case "OTDoctor":
            DATA[2].data.push(data.appUsers[index]);
            break;
          case "OTAdmin":
            DATA[3].data.push(data.appUsers[index]);
            break;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (DATA[i].data.length == 0) {
          DATA[i].data.push({
            id: 0,
            name: "No " + DATA[i].title + " members",
            userType: "Empty",
          });
        }
      }
      setSectionData(DATA);
    }
  }, [data]);

  const emptyComponent = () => {
    return <Text style={styles.empty}>No members</Text>;
  };

  const checkUser = (val) => {
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
      case "OTDoctor":
        if (val === "OTStaff" || val === "OTIncharge") {
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

  const setFocus = (type) => {
    switch (type) {
      case "OTStaff":
        return true;
      case "OTIncharge":
        return true;
      case "OTDoctor":
        if (props.userType === "OTAdmin" || props.userType === "OTSuperUser") {
          return true;
        } else {
          return false;
        }
      case "OTAdmin":
        if (props.userType !== "OTAdmin" && props.userType !== "OTDoctor") {
          return true;
        } else {
          return false;
        }
    }
  };

  const Item = ({ title }) => (
    <>
      {title.userType === "Empty" ? (
        <Text
          style={{ textAlign: "center", paddingVertical: 10, fontSize: 14 }}
        >
          {title.name}
        </Text>
      ) : (
        <TouchableOpacity
          style={styles.ItemContainer}
          onPress={() => {
            props.navigation.navigate("adduser", {
              from: "admin",
              userId: title.id,
              userType: title.userType,
              userName: title.name,
              focus: setFocus(title.userType),
            });
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title.name}</Text>
          {checkUser(title.userType) && (
            <IconButton
              icon="delete-outline"
              color={"#010101"}
              size={20}
              onPress={() => {
                setDeleteAlert(true);
                setDeleteData([
                  {
                    id: title.id,
                    name: title.name,
                    type: title.userType,
                  },
                ]);
              }}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );

  const ListHeaderComponent = () => {
    return (
      <View style={styles.topView}>
        <Text style={styles.userText}>Users</Text>
        <Button
          icon="plus"
          mode="contained"
          color={"#006bcc"}
          uppercase={false}
          labelStyle={{ fontSize: 16 }}
          style={{ borderRadius: 7 }}
          onPress={() =>
            props.navigation.navigate("adduser", {
              focus: true,
              branch:
                props.route.params?.from === "branches" ||
                props.route.params?.from === "adduser"
                  ? props.route.params?.branch
                  : props.branch,
            })
          }
        >
          Add User
        </Button>
      </View>
    );
  };

  const closeOnSuccess = (id) => {
    setDeleteAlert(false);
    refetch();
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" hidden={false} />
      <DeletePopup
        alert={deleteAlert}
        setAlert={setDeleteAlert}
        id={deleteData[0]?.id}
        name={deleteData[0]?.name}
        type={deleteData[0]?.type}
        closeOnSuccess={closeOnSuccess}
      />
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={[
            styles.modalHeader,
            Platform.OS === "web" && {
              borderBottomWidth: 1,
              borderBottomColor: "#E0E0E0",
              paddingVertical: 20,
            },
            props.userType === "OTSuperUser" && { justifyContent: "center" },
          ]}
        >
          <IconButton
            icon={props.userType === "OTSuperUser" ? "arrow-left" : "menu"}
            color={"#010101"}
            size={25}
            style={{ position: "absolute", left: 2 }}
            onPress={() => {
              if (props.userType === "OTSuperUser") {
                props.navigation.goBack();
              } else {
                props.navigation.openDrawer();
              }
            }}
          />
          <Text
            style={[
              styles.headerTitle,
              props.userType !== "OTSuperUser" && { marginLeft: 73 },
            ]}
          >
            {branchName}
          </Text>
        </View>
        <SectionList
          sections={sectionData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => <Item title={item} />}
          ListEmptyComponent={emptyComponent}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.title}>{title}</Text>
          )}
        />
        {alert && (
          <Portal>
            <View style={styles.alertView}>
              <View style={styles.alertContainer}>
                <Text style={styles.alertHeader}>User Alert</Text>
                <Text style={styles.alertText}>{alertMsg}</Text>
                <Button
                  mode="contained"
                  color={"#006bcc"}
                  uppercase={false}
                  labelStyle={{ fontSize: 16 }}
                  style={{ borderRadius: 7, marginTop: 20 }}
                  onPress={() => setAlert(false)}
                >
                  Okay
                </Button>
              </View>
            </View>
          </Portal>
        )}
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
  userType: state.userType,
  branchName: state.branchName,
});

export default connect(mapStateToProps)(Users);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ItemContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
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
    marginBottom: 20,
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
  popsStyle: {
    width: 300,
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
  alertView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  alertText: {
    textAlign: "center",
    fontSize: 16,
    color: "#170500",
  },
  alertHeader: {
    textAlign: "center",
    fontSize: 18,
    color: "#170500",
    fontWeight: "bold",
    marginBottom: 25,
  },
  modalHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
