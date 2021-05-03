import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
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
import { GetResourcesDetails } from "../src/graphql/queries";
import {
  GetSharedResource_OperationTheaters,
  ENUM_RESOURCE_TYPE,
  GetSurgeryDetails,
  Check_Process_Progress,
} from "../src/graphql/queries";
import { Divider, Button } from "react-native-paper";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import MessageComponent from "./messageComponent";

const apolloClient = client;
const date = new Date();
var location = "Coles Road";
var _data;
var _operationTheaterData = [];
var message = [];
function homeScreen(props, route) {
  const [renderFlatlistData, setRenderFlatlistData] = useState();
  const [processMessageData, setProcessMessageData] = useState([]);
  // const { loading, error, refetch, data } = useQuery(GetSharedResource_OperationTheaters);
  // if(data){
  //   _data = data.appResources.concat(data.operationTheaters);
  //   // for(var i=0;i<_data.length;i++){

  //   // }
  //   console.log(_data);
  // }
  // if(error){GetSharedResource_OperationTheaters
  //     //console.log("Error",error);
  // }
  // if(loading){
  //     //console.log("loading",loading);
  // }

  React.useEffect(() => {
    if (renderFlatlistData) {
      for (var i = 1; i < _data.length; i++) {
        _operationTheaterData = [];
        apolloClient
          .query({
            query: GetSurgeryDetails,
            variables: {
              operation_theater: parseInt(_data[i].id),
              Date: new Date().toISOString().slice(0, 10),
              app_user: parseInt(props.userId),
            },
            fetchPolicy: "network-only",
          })
          .then((Result) => {
            for (var i = 0; i < 2; i++) {
              _operationTheaterData.push(Result.data.appResources[i]);
            }
            try {
              for (
                var i = 0;
                i < Result.data.questions[0].processes_data[0].Answer;
                i++
              ) {
                _operationTheaterData.push(
                  Result.data.appResources[preSurgeryProcessID - 1]
                );
              }
            } catch {}
            _operationTheaterData.push(
              Result.data.appResources[Result.data.appResources.length - 1]
            );
            //console.log("Operational Data---",_operationTheaterData)
          });
      }
    }
  }, [renderFlatlistData]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      //console.log("HOME SCREEN")
      apolloClient
        .query({
          query: GetSharedResource_OperationTheaters,
          fetchPolicy: "network-only",
        })
        .then(async (Result) => {
          _data = Result.data.appResources.concat(
            Result.data.operationTheaters
          );
          setRenderFlatlistData(Result.data);
          let global_process_status = [];
          for (var i = 0; i < Result.data.operationTheaters.length; i++) {
            console.log("=========", parseInt(props.userId));
            await apolloClient
              .query({
                query: Check_Process_Progress,
                variables: {
                  userId: parseInt(props.userId),
                  otID: Result.data.operationTheaters[i].id,
                  date: new Date(),
                },
                fetchPolicy: "network-only",
              })
              .then((response) => { 
                var processData = response.data.appResources; 
                let status_arr = [];
                for (var t = 0; t <= 4 - 1; t++) {
                  status_arr[t] = 0;
                }

                for (var m = 0; m < 4; m++) {
                  for (
                    var q = 0;
                    q < processData[m].process_details.length;
                    q++
                  ) {
                    if (m === 2) {
                      if (
                        processData[m].process_details[q].processes_data
                          .length > 0
                      ) {
                        let instance = 0;
                        for (
                          var sur = 0;
                          sur <
                          processData[m].process_details[q].processes_data
                            .length;
                          sur++
                        ) { 
                          if (
                            processData[m].process_details[q].processes_data[
                              sur
                            ].check_editable
                          ) {
                            instance =
                              processData[m].process_details[q].processes_data[
                                sur
                              ].instance;
                            status_arr[m] = instance;
                          } else {
                            status_arr[m] = 0;
                          }
                        } 
                      } else {
                        status_arr[m] = 0;
                        break;
                      }
                    } else {
                      if (
                        processData[m].process_details[q].processes_data
                          .length > 0
                      ) {
                        try {
                          if (
                            processData[m].process_details[q].processes_data[0]
                              .check_editable
                          ) {
                          }
                        } catch (error) {
                          status_arr[m] = false;
                          break;
                        }
                      } else {
                        status_arr[m] = false;
                        break;
                      }
                    }
                  }
                }
                global_process_status = [...global_process_status, status_arr];
              });
          }
          setProcessMessageData(global_process_status); 
        });
    });
    return unsubscribe;
  }, [props.navigation]);
  const getTextForProcessMessage = (index) => {
    let varArra = processMessageData;
    let message = "On going start of the day.";

    if (varArra.length > 0) {
      for (var i = 0; i < varArra[index].length; i++) {
        if (varArra[index][0] === 0 && varArra[index][1] === 0) {
          message = "Cleared for start of the day.";
        }
        if (varArra[index][2] > 0) {
          message = "Cleared for surgey - " + (varArra[index][2] - 1);
        }
        if (varArra[index][3] === 0) {
          message = "Cleared for end of day";
        }
      }
    }
    
    return message;
  };
  const renderResources = (item) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={[styles.appButtonContainer, { flex: 1 }]}
          onPress={() => {
            item.item.__typename == "AppResource"
              ? props.navigation.navigate("processScreen", {
                  userId: props.userId,
                  resourceID: item.item.id,
                  operationTheaterID: item.item.id,
                  resourceName: item.item.name,
                })
              : props.navigation.navigate("preProcessScreen", {
                  userId: props.userId,
                  operationTheaterID: item.item.id,
                  operationTheaterName: item.item.name,
                });
          }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                //borderRadius:6,
                height: 60,
                width: "100%",
                alignItems: "center",
                paddingLeft: 20,
                margin: 0,
              },
              { flex: 1 },
            ]}
          >
            <Text style={[styles.appButtonText, { flex: 1, marginRight: 14 }]}>
              {item.item.name}
            </Text>
            <View
              style={{
                width: 30,
                height: 30,
                marginEnd: 14,
                alignContent: "flex-end",
              }}
            >
              <MaterialCommunityIcons name="arrow-right" size={30} />
            </View>
          </View>

          {/* <View style={[{
                    flexDirection:"row",
                    //borderRadius:6,
                    height:30,
                    width:"100%",
                    alignItems:"center",
                    paddingLeft:20,
                    margin:0},{flex:1}]}>
        <View style={{width:30,height:30,marginLeft:14}}>
          <MaterialCommunityIcons
          name='play-box' size={30}/>
        </View>
        <Text style={[styles.appButtonText,{flex:1, marginRight:14,}]}>
          {"Process Message"}
        </Text>
        <View style={{ width:30,height:30,marginEnd:14, alignContent:'flex-end'}}>
        
        </View>
      </View> */}
          {item.index > 0 && (
            <MessageComponent
              message={getTextForProcessMessage(item.index - 1)}
              //message={getCurrentMessage(item.item.id)}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#006bcc" hidden={false} />
      <View
        style={{ backgroundColor: "#006bcc", width: "100%", height: "100%" }}
      >
        <View style={styles.header}>
          <View style={styles.headerTextLabel}>
            <Text
              style={{ fontWeight: "bold", fontSize: 30, color: "#ffffff" }}
            >
              Hello, John
            </Text>
            <Divider
              style={{ width: "100%", height: 1, backgroundColor: "white" }}
            />
          </View>
          <View style={styles.subHeader}>
            <View style={styles.flexContainer}>
              <View style={styles.box1}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  style={{ alignSelf: "center", marginHorizontal: 5 }}
                  color="white"
                  size={20}
                />
                <Text style={styles.location}>{location}</Text>
              </View>
              <View style={styles.box2}></View>
              <View style={styles.box3}>
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
            <Text style={styles.headerTextStyle}>Todays Progress.</Text>
          </View>
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
            {renderFlatlistData && (
              <FlatList
                style={{ width: "90%", alignSelf: "center" }}
                data={_data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderResources}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId,
});
export default connect(mapStateToProps)(withNavigation(homeScreen));

const styles = StyleSheet.create({
  subHeader: {
    justifyContent: "center",
    width: "90%",
  },
  flexContainer: {
    height: 30,
    flexDirection: "row",
  },
  box1: {
    width: 120,
    height: "100%",
    flexDirection: "row",
  },
  box2: {
    width: 1,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  box3: {
    height: "100%",
    flexGrow: 1,
    flexDirection: "row",
  },
  headerTextLabel: {
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  headerTextStyle: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#000000",
  },
  header: {
    backgroundColor: "#006bcc",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  location: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    width: "100%",
    height: 30,
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
    backgroundColor: "white",
    width: "100%",
    height: 90,
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  appButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginLeft: 14,
    width: 200,
  },
});
