import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View,Text, StyleSheet } from 'react-native';

const MessageComponent = (props)=>{
  
    const item = props.message
 
    return(
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <MaterialCommunityIcons name={item.icon} size={19} color={item.color}/>
           <Text style={{marginLeft:8,fontSize:16,color:item.color}}>{item.message}</Text>
         </View>
    )
}

const styles = StyleSheet.create({
     
    appButtonText: {
      fontSize: 18,
      color: "#000000",
      fontWeight: "bold",
      textAlign: "left",
      textAlignVertical:"center",
      marginLeft:14,
      width:200,
    }
  
  });
export default MessageComponent;