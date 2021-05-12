import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Portal } from "react-native-paper";
import { DeactivateUser } from "../src/graphql/queries";
import { useMutation } from "@apollo/client";

const DeletePopup = (props) => {
  let [deactivateUser, { data: deactivatedData }] = useMutation(
    DeactivateUser,
    {
      onCompleted: (data) => {
        props.closeOnSuccess(data.updateAppUser.appUser.branch.id);
      },
    }
  );

  const deactivate = (id) => {
    deactivateUser({
      variables: {
        userId: id,
        active: false,
      },
    });
  };

  return (
    <>
      {props.alert && (
        <Portal>
          <View style={styles.alertView}>
            <View style={styles.alertContainer}>
              <Text style={styles.welcome}>Delete User</Text>
              <Text style={styles.upperText}>
                Do you want to delete the {props.type} user {props.name}
              </Text>
              <View style={styles.buttonView}>
                <Button
                  mode="contained"
                  color={"#006bcc"}
                  labelStyle={{ fontSize: 12 }}
                  style={styles.button}
                  onPress={() => props.setAlert(false)}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  color={"#006bcc"}
                  labelStyle={{ fontSize: 12 }}
                  style={styles.button}
                  onPress={() => deactivate(props.id)}
                >
                  Yes
                </Button>
              </View>
            </View>
          </View>
        </Portal>
      )}
    </>
  );
};

export default DeletePopup;

const styles = StyleSheet.create({
  alertView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0,0, 0.5)",
  },
  alertContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
    paddingVertical: 32,
  },
  button: {
    borderRadius: 8,
    width: 127,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  upperText: {
    fontSize: 12,
    color: "#535353",
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 32,
  },
});
