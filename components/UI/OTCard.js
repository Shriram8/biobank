import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MessageComponent from '../../screens/messageComponent';

const OTCard = (props)=>{
    return(
        <TouchableOpacity
        onPress={props.onPress}
        style={{backgroundColor:'#fff',borderRadius:8 ,justifyContent:'center',padding:20,elevation:6}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
           <Text style={{fontSize:18,color:'#000',fontWeight:'bold'}}>{props.title}</Text>
           <MaterialCommunityIcons name="arrow-right" size={18} />
           </View>
           {props.message&&(
                <MessageComponent message={props.message}/>
           )}
        </TouchableOpacity>
    )
}
export default OTCard;