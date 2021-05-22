import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getTime } from "../../utility/utility";
let alertColor="#c2c2c2"
const AlertCard = (props) => {
    const title= props.title
    const alertType = props.alertType;
    const processData = props.processData
    const processDetail = props.processDetail;
    const answer = props.processAnswer;
    const staff = props.staffName;
    const time = props.timeCreated;
    const pretitle=props.pretitle
    if(alertType =="notCleared"){
       alertColor="#f23627"
    }else if(alertType==="cleared"){
      alertColor="#0fbb5b"
    }
  return (
    <View style={[styles.container]}>
      <Text>{pretitle}</Text>
      <View style={{ flexDirection: "row", alignItems: "center",paddingVertical:12 }}>
        {alertType!="overridden" &&<MaterialCommunityIcons name={alertType==="cleared"?"checkbox-marked":"alert-box"} size={24} color={alertColor} />}
        <Text style={{fontWeight:'bold',fontSize:18}}>{title}</Text>
      </View>
      <Text style={{fontWeight:'600',fontSize:16}}>{processData}</Text>
      <Text style={{fontWeight:'500',fontSize:16}}>{processDetail} </Text>
     
     {
       answer &&(
        <View style={{ flexDirection: "row", justifyContent:'space-between',paddingVertical:8 }}>
        <Button 
        color={answer==="yes"?"#fff":"#959595"}
        style={[styles.boolButton,answer==="yes"&&{backgroundColor:"#006be2",borderWidth:0,color:"#fff"} ]}>Yes</Button>
        <Button
         color={answer==="no"?"#fff":"#959595"}
          style={[styles.boolButton,,answer==="no"&&{backgroundColor:"#f40000",borderWidth:0}]}
        >
          No
        </Button>
      </View>
       )
     }
      <View style={{ flexDirection: "row", justifyContent: "space-between",paddingVertical:12 }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <MaterialCommunityIcons name="account" size={24} color={"#5d5d5d"}/>
        <Text style={{fontSize:16}}>{staff}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <MaterialCommunityIcons name="clock" size={24} color={"#5d5d5d"} />
        <Text style={{fontSize:16}}>{getTime(time)}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin:12,
    borderRadius:8,
    backgroundColor:'#fff',
    padding:24,
    width:"100%",
    maxWidth:330

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
