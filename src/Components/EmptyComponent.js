import React from 'react';
import {View,Text, StyleSheet } from 'react-native';
const EmptyComponent = (props)=>{
    const title=props.title;
    return (
        <View style={[styles.container]}>
            <Text>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default EmptyComponent;