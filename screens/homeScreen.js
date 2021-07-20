import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { client } from "../src/graphql/ApolloClientProvider";
import { Picker } from "@react-native-picker/picker";
import {
  GetDActues, GetQuestions
} from "../src/graphql/queries";

import { Divider, Button, ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import MessageComponent from "./messageComponent";
import { fontSizes } from "../components/UI/Theme";
import OTCard from "../components/UI/OTCard";
import Branches from "./Branches";
import CsvDownload from 'react-json-to-csv'

const apolloClient = client;
const date = new Date();


function homeScreen(props, route) {
  const [renderFlatlistData, setRenderFlatlistData] = useState();
  const [selectedInstrument, setSelectedInstrument] = useState(0);
  const [selectTableData,setSelectTableData] = useState(null);
  const [selectTable,setSelectTable] = useState(0);
  const [renderQuestionResult, setrenderQuestionResult] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [mockData, setmockData] = useState(
    null
  );
  
  const tempData = [
    {
      "age": 51,
      "record_id": "CoBIO-A0100"
    },
    {
      "age": 61,
      "record_id": "CoBIO-A0101 "
    },
    {
      "age": 64,
      "record_id": "CoBIO-A0102"
    },
  ]

  const instrumentData = 
    [
      {
        "name": "Choose Instrument",
        "value": "Choose Instrument"
      },
      {
        "name": "Demographics",
        "value": "Demographics"
      }
    ]

    const Demographics = 
    [
      {
        "name": "Choose Table",
        "value": "Choose Table"
      },
      {
        "name": "Acute",
        "value": "Acute"
      },
      {
        "name": "Convoluscent",
        "value": "Convolucsent"
      },
      {
        "name": "Control",
        "value": "Control"
      }

    ]
  

  React.useEffect(() => {
    if (renderFlatlistData) {
      
    }
  }, [renderFlatlistData]);

  
  

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getQuestions();

      return unsubscribe;
    });
  }, [props.navigation]);

  

  
  const getData = () => {
        apolloClient
          .query({
            query: GetDActues,
            
            fetchPolicy: "network-only",
          })
          .then((Result) => {
            setmockData(Result.data.dControls);
            //setmockData(tempData);
            
          })
          .catch(() => {
            setmockData(tempData);
          });
    
  }

  const getQuestions = () => {
    apolloClient
     .query({
       query: GetQuestions,
       fetchPolicy: "network-only",
     })
     .then((Result) => {
    console.log("questions here",Result)
    setrenderQuestionResult(Result.data.quetions)
    });

  }
  
  const renderResources = (item) => {
    return(
    
    <View style={{marginVertical: 16,padding: 2,width: "100%",height:40,backgroundColor:"red"}}>
      <Text style={[styles.appButtonText, { flex: 1, marginBottom: 16 }]}>
            {item.item.question}
      </Text>
        {console.log('questions',item.item.question)}
    </View>)
  };


  return (
    <>
      <StatusBar animated={true} backgroundColor="#3c7d4d" hidden={false} />

      <View
        style={{ backgroundColor: "#3c7d4d", width: "100%", height: "100%" }}
      >
        <View style={styles.header}>
          <View style={styles.headerTextLabel}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "#ffffff",
                  marginVertical: 16,
                }}
              >
                Hello,{" "}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#ffffff",
                  marginVertical: 16,
                }}
              >
                Shriram
              </Text>
            </View>

            <Divider
              style={{ width: "100%", height: 1, backgroundColor: "#ffffff" }}
            />
          </View>
          <View style={styles.subHeader}>
            <View style={styles.flexContainer}>
              <View
                style={[
                  styles.box3,
                  props.userType !== "OTSuperUser" && { marginLeft: 0 },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-text"
                  style={{ alignSelf: "center", marginHorizontal: 5 }}
                  color="white"
                  size={20}
                />
                <Text style={styles.location}>{date.toDateString()}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius: 30 }}
        >
          <View
            style={{
              justifyContent: "space-around",
              height: 50,
              marginLeft: 22,
              marginTop: 26,
            }}
          >
          {/* <Button
            mode="contained"
            color={"#3c7d4d"}
            uppercase={false}
            style={[styles.appButtonQuestions, { flex: 1, marginBottom: 16 }]}
            labelStyle={{ fontSize: 16 }}
            onPress={getQuestions}
          >
            Questioneries
          </Button> */}
            
          </View>
          {/* {props.userType === "OTSuperUser" ? (
            <Branches navigation={props.navigation} />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                marginVertical: 10,
                marginTop: 10,
              }}
            >
              <View style={{
                flexDirection:"row",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal:50,
                marginVertical: 10,
              }}>
                <Text style={[styles.appButtonText, { flex: 1, marginBottom: 16 }]}>
                Select Instrument
              </Text>
              
            <Picker
              selectedValue={selectedInstrument}
              enabled={true}
              style={{
                height: 40,
                borderRadius: 7,
                backgroundColor: "white",
                borderColor: "#959595",
                borderWidth: 1,
                fontSize: 16,
                color: "#959595",
                fontWeight: "bold",
              }}

              onValueChange={(itemValue, itemIndex) =>{
                setSelectedInstrument(itemValue);
                setSelectTableData(Demographics);

              }
                
              }
              
            >
               {instrumentData.map((data) => (
                  <Picker.Item label={data.name} value={data.value} />
              ))}
            </Picker>
          </View>
          <View style={{
                flexDirection:"row",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal:50,
                marginVertical: 10,
              }}>
                
            {selectTableData != null?(
              <>
            <Text style={[styles.appButtonText, { flex: 1, marginBottom: 16 }]}>
            Select Table
          </Text>
            <Picker
              selectedValue={selectTable}
              enabled={true}
              style={{
                height: 40,
                borderRadius: 7,
                backgroundColor: "white",
                borderColor: "#959595",
                borderWidth: 1,
                fontSize: 16,
                color: "#959595",
                fontWeight: "bold",
              }}

              onValueChange={(itemValue, itemIndex) =>{
                setSelectTable(itemValue)
              }
                
              }
              
            >
               {selectTableData.map((data) => (
                  <Picker.Item label={data.name} value={data.value} />
              ))}
            </Picker></>):<></>}
          </View>
          {selectTable?<Button
            mode="contained"
            color={"#3c7d4d"}
            uppercase={false}
            style={styles.reset}
            labelStyle={{ fontSize: 16 }}
            onPress={getData}
          >
            Get Data
          </Button>:<></>}

          {mockData?<CsvDownload 
              data={mockData}
              filename="Demographics_Control_data.csv"
          >
            Download Data ✨
          </CsvDownload>:<></>
          }

          
            </View>
          )} */}
          {renderQuestionResult?
          <FlatList
            style={{ width:"100%", alignSelf: "center",backgroundColor:"pink"}}
            data={renderQuestionResult}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={renderResources}
            /> : <></>
          }
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId,
  userType: state.userType,
  branch: state.branch,
  jwtToken:state.jwtToken
});
export default connect(mapStateToProps)(withNavigation(homeScreen));

const styles = StyleSheet.create({
  reset: {
    width: "12%",
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
  },
  subHeader: {
    marginTop: 32,
    justifyContent: "center",
    width: "90%",
    paddingBottom: 24,
  },
  flexContainer: {
    // height: 30,
    flexDirection: "row",
  },
  box1: {
    height: "100%",
    flexDirection: "row",
  },
  box2: {
    width: 1,
    height: "100%",
    backgroundColor: "#3c7d4d",
  },
  box3: {
    height: "100%",
    flexGrow: 1,
    flexDirection: "row",
  },
  headerTextLabel: {
    marginBottom: 8,
    height: 50,
  },
  headerTextStyle: {
    fontWeight: "bold",
    fontSize: fontSizes.xxl,
    color: "#000000",
  },
  header: {
    backgroundColor: "#3c7d4d",
    marginHorizontal: 24,

    justifyContent: "center",
  },
  location: {
    fontSize: 14,
    color: "#ffffff",
    // fontWeight: "bold",
    textAlignVertical: "center",
    width: "100%",
    // height: 30,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "yellow",
  },
  container: {
    marginTop: 150,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 20,
    borderTopLeftRadius: 30,
  },
  item: {
    padding: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    //flexDirection:"row",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    height: 90,
    margin: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "normal",
    textAlign: "left",
    textAlignVertical: "center",
  },
  appButtonQuestions: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginHorizontal: 14,
  },

  
});
