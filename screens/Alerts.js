import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {View,Text, FlatList} from 'react-native';
import EmptyComponent from '../src/Components/EmptyComponent';
import { GET_ALL_OTS } from '../src/graphql/AlertQueries';
import AlertCard from './AlertsComponent/AlertCard';
import ScrollableOTs from './HistoryComponents/ScrollableOTs';
const Alerts = ()=>{
    const [selectedOT, setSelectedOT] = useState("");
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
            <View style={{alignItems:'center'}}>
                <AlertCard
                
                title="Not cleared for surgey 01"
                processData="P5 - Sterilization"
                processDetail="Indicator Check 2 : Class 5 indicator has turned to Black in Linen bin"
                pretitle={"Process overridden"}
                staffName={"Nandini"}
                timeCreated={new Date()}
                alertType={"overridden"}
                />
            </View>
        )
    }
    return(
        <View style={{flex:1 }}>
            {data?(
                <>
                <ScrollableOTs
                setSelectedOT={setSelectedOT}
                selectedOT={selectedOT}
                />
                <FlatList
                
                data={[0]}
                renderItem={renderAlerts}
                />
                </>
            ):(
             <EmptyComponent
             title="No alerts for today!"
             />
            )}
        </View>
    )
}
export default Alerts;