import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View,Text, StyleSheet } from 'react-native';
import { fontSizes } from '../components/UI/Theme';

const MessageComponent = (props)=>{
  
    const item = props.message?props.message:"Process Message"
    return(
        <View style={[{
            flexDirection:"row",
            //borderRadius:6,
            height:30,
            width:"100%",
            alignItems:"center",
            paddingLeft:20,
            margin:0 , marginLeft:25},{flex:1}]}>
 
  <MaterialCommunityIcons
  name={item.icon} size={28} color={item.color}/>
 
<Text style={[styles.appButtonText,{flex:1, marginRight:14,color:"#646464"}]} numberOfLines={1}>
  {item.message}
</Text>
<View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>

</View>
</View>
    )
}

const styles = StyleSheet.create({
     
    appButtonText: {
      fontSize: fontSizes.sm,
      color: "#000000",
      
      textAlign: "left",
      textAlignVertical:"center",
      marginLeft:14,
      width:200,
    }
  
  });
export default MessageComponent;