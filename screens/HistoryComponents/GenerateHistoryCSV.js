import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {View,Text} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { GET_OT_PROCESS_DATA, GET_OT_PROCESS_DETAILS } from '../../src/graphql/HistoryQueries';
import { json2csv } from 'json-2-csv';
import { getDate } from '../../utility/utility';
// import { GET_ALL_OTS } from '../src/graphql/AlertQueries';
const GenerateHistoryCSV = (props)=>{
    const date= props.selectedDate;
    const otID = props.selectedOT;
    const [fileDownloadControl,setFileDownloadControl] = useState(true)
    console.log("====================otID is",date, otID)
    const {data, error, loading} = useQuery(GET_OT_PROCESS_DATA,{
        fetchPolicy:'network-only',
        variables:{
            otID:otID,
            date: date 
        }
    })
    if(data){
        console.log("data**********")
    }

    //const { parse } = require('json2csv');
    const jsonexport = require("jsonexport/dist")
    
    useEffect(()=>{
        if(data){ 
            if(data.operationTheaters[0].processes_data.length>0){
                if(fileDownloadControl){
                    console.log("=========",fileDownloadControl)
                    json2csv(data.operationTheaters[0].processes_data,{expandArrayObjects :true}, function(err, csv){
                        if (err) return console.error(err);
                        //console.log(csv);
                        setFileDownloadControl(false)
                        props.saveFile(data.operationTheaters[0].name+"_"+getDate(date)+".csv", csv)
                    });
                }
               
            }else{
                props.hidePortal();
                props.setsnackVisible(true)
                props.setsnackText("No process details found.")
            }
        
        }
    },[data])

    return(
        <View style={{width:'90%',backgroundColor:'#fff',alignItems:'center',justifyContent:'center',padding:12,borderRadius:8}}>
            
               
               <ActivityIndicator color={"#006bcc"} size={32} />
                <Text>Generating your report.</Text>
               
            
        </View>
    )
}
export default GenerateHistoryCSV;