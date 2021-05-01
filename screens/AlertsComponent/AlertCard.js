import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const AlertCard = (props) => {
    const title= props.title
    const alertType = props.alertType;
    const processData = props.processData
    const processDetail = props.processDetail
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row", alignItems: "center",paddingVertical:12 }}>
        <MaterialCommunityIcons name="alert-box" size={24} />
        <Text style={{fontWeight:'bold',fontSize:18}}>{title}</Text>
      </View>
      <Text style={{fontWeight:'600',fontSize:16}}>{processData}</Text>
      <Text style={{fontWeight:'500',fontSize:16}}>{processDetail} </Text>
     
      <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
        <Button style={[styles.boolButton ]}>Yes</Button>
        <Button
          style={styles.boolButton}
        >
          No
        </Button>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button>Name</Button>
        <Button>TIME</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin:12,
    borderRadius:8,
    backgroundColor:'#fff',
    padding:24

  },
  boolButton: {
    width: 120,
    height:40,
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius:8
  },
});
export default AlertCard;
