import { useQuery } from '@apollo/client';
import React from 'react';
import {View,Text} from 'react-native';
import { GET_OT_PROCESS_DETAILS } from '../../src/graphql/HistoryQueries';
// import { GET_ALL_OTS } from '../src/graphql/AlertQueries';
const GenerateHistoryCSV = (props)=>{
    const date= props.selectedDate;
    const otID = props.selectedOT;
    
    const {data, error, loading} = useQuery(GET_OT_PROCESS_DETAILS,{
        fetchPolicy:'network-only',
        variables:{
            otID:otID,
            date: date.toISOString()
        }
    })
    if(data){
        console.log("data**********",data)
    }
    return(
        <View>
            <Text>GenerateHistoryCSV Screen</Text>
        </View>
    )
}
export default GenerateHistoryCSV;