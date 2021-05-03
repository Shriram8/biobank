import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View,Text, StyleSheet } from 'react-native';

const MessageComponent = (props)=>{
  
    const message = props.message?props.message:"Process Message"
    return(
        <View style={[{
            flexDirection:"row",
            //borderRadius:6,
            height:30,
            width:"100%",
            alignItems:"center",
            paddingLeft:20,
            margin:0},{flex:1}]}>
<View style={{width:30,height:30,marginLeft:14}}>
  <MaterialCommunityIcons
  name='play-box' size={30}/>
</View>
<Text style={[styles.appButtonText,{flex:1, marginRight:14,}]} numberOfLines={1}>
  {message}
</Text>
<View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>

</View>
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