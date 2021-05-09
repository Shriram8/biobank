import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Button, Portal } from "react-native-paper";

const SuccessPopup = (props) => {
  return (
    <>
      {props.alert && (
        <Portal>
          <View style={styles.alertView}>
            <View style={styles.alertContainer}>
              <Image
                style={styles.image}
                source={require("../Images/success.png")}
              />
              <Text style={styles.welcome}>WELLDONE</Text>
              <Text style={styles.upperText}>On completing all the OT-1</Text>
              <Text style={styles.lowerText}>Processes for today</Text>
              <Button
                mode="contained"
                color={"#006bcc"}
                labelStyle={{ fontSize: 12 }}
                style={styles.button}
                onPress={() => props.setAlert(false)}
              >
                Yay!
              </Button>
            </View>
          </View>
        </Portal>
      )}
    </>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({
  alertView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(241, 241, 241, 0.8)",
  },
  alertContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 88,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  button: {
    borderRadius: 8,
    marginBottom: 64,
    width: 127,
    height: 40,
    justifyContent: "center",
  },
  image: {
    height: 127,
    width: 127,
    marginVertical: 32,
  },
  welcome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  upperText: {
    fontSize: 12,
    color: "#535353",
    fontWeight: "bold",
    marginTop: 4,
  },
  lowerText: {
    fontSize: 12,
    color: "#535353",
    fontWeight: "bold",
    marginBottom: 48,
  },
});
