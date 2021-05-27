import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {View,Text, FlatList} from 'react-native';
import EmptyComponent from '../src/Components/EmptyComponent';
import { GET_ALL_OTS_FOR_ALERTS } from '../src/graphql/AlertQueries';
import AlertCard from './AlertsComponent/AlertCard';
import ScrollableOTs from './HistoryComponents/ScrollableOTs';
import {getfirebasedb} from "../src/config";
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
let dataList =[];
//Alert types to be used 
// overridden - when process is overrodden by incharge
// milestone - when a milestone is reached
// notcleared - when a process is not cleared
// delay - when process is exceeded or delayed
const Alerts = (props)=>{
    const [selectedOT, setSelectedOT] = useState("");
    const [alertsData,setAlertsData ] = useState([]);
    const [refetchAlerts,setrefetchAlerts ] = useState(false)
    const {data,error,loading} = useQuery(GET_ALL_OTS_FOR_ALERTS,{
        fetchPolicy:"network-only",
        variables:{
            userID:props.userId
        }
    })
    if(data){
        console.log("data",data)
    }
    if(error){
        console.log("error occured",error)
    }
    useEffect(()=>{
        
        if(data){ 
            getfirebasedb().ref(data.appUser.branch.id+'/ot-'+(selectedOT?selectedOT:data.operationTheaters[0].id)).orderByKey()
        .limitToLast(10).on('value', async (snapshot) => {
            let alerts =[]
            await snapshot.forEach(element => {
              const highscore = element.val();
              
               alerts.push(highscore) 
            });
            setAlertsData(alerts.reverse())
             
            });
        
        }
       
    },[data, refetchAlerts]);
    useEffect(()=>{
       setAlertsData([])
       setrefetchAlerts(!refetchAlerts)
    },[selectedOT])
    const renderAlerts=({item,index})=>{
        return(
            <View style={{alignItems:'center'}}>
                <AlertCard
                
                title={item.alertMessage}
                processData={item.processName}
                processDetail={item.processMessage}
                processAnswer={item.answer}
                staffName={item.staff}
                timeCreated={new Date(item.createdAt)}
                alertType={item.alertType}
                />
            </View>
        )
    }
    return(
        <View style={{flex:1 }}>
            <Button 
            onPress={()=>{
                getfirebasedb()
            .ref(data.appUser.branch.id+"/ot-"+(selectedOT?selectedOT:data.operationTheaters[0].id))
            .push( {
                  createdAt: new Date().toString(), 
                  processName:"P5-Sterilization",
                  processMessage:"Indicator Check 2: Class 5 indicator  has turned to black in Linen bin",
                  answer:"no",
                  staff:"Nandini",
                  alertType:"delay",
                  alertMessage:"Not cleared for surgery 01",
                  

                } ).then(() => {
                        //console.log("SUCCESSS")
                        // getfirebasedb().ref("csServerEvents").push(data);
                        // callback();
                });
            }}
            >
                Add alert
            </Button>
            {data?(
                <>
                <ScrollableOTs
                setSelectedOT={setSelectedOT}
                selectedOT={selectedOT}
                />
                <FlatList
                
                data={alertsData}
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
const mapStateToProps = (state) => ({
    userId: state.userId,
    userType: state.userType,
    branch: state.branch,
    jwtToken:state.jwtToken
  });
  export default connect(mapStateToProps)(withNavigation(Alerts));