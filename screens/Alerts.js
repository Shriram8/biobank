import { useQuery } from '@apollo/client';
import React from 'react';
import {View,Text} from 'react-native';
import { GET_ALL_OTS } from '../src/graphql/AlertQueries';
const Alerts = ()=>{
    const {data,error,loading} = useQuery(GET_ALL_OTS,{
        fetchPolicy:"network-only"
    })
    if(data){
        console.log("data",data)
    }
    if(error){
        console.log("error occured",error)
    }
    return(
        <View>
            <Text>History Screen</Text>
        </View>
    )
}
export default Alerts;