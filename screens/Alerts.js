import { useQuery } from '@apollo/client';
import React from 'react';
import {View,Text, FlatList} from 'react-native';
import EmptyComponent from '../src/Components/EmptyComponent';
import { GET_ALL_OTS } from '../src/graphql/AlertQueries';
import AlertCard from './AlertsComponent/AlertCard';
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
    const renderAlerts=({item,index})=>{
        return(
            <View>
                <AlertCard
                
                title="Not cleared for surgey 01"
                processData="P5 - Sterilization"
                processDetail="Indicator Check 2 : Class 5 indicator has turned to Black in Linen bin"
                />
            </View>
        )
    }
    return(
        <View style={{flex:1 }}>
            {data?(
                <FlatList
                
                data={[0]}
                renderItem={renderAlerts}
                />
            ):(
             <EmptyComponent
             title="No alerts for today!"
             />
            )}
        </View>
    )
}
export default Alerts;