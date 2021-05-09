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
import { GetResourcesDetails } from "../src/graphql/queries";
import {
  GetSharedResource_OperationTheaters,
  ENUM_RESOURCE_TYPE,
  GetSurgeryDetails,
  GetUserDataById,
  Check_Process_Progress,
} from "../src/graphql/queries";
import { Divider, Button, ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import MessageComponent from "./messageComponent";
import { fontSizes } from "../components/UI/Theme";
import OTCard from "../components/UI/OTCard";

const apolloClient = client;
const date = new Date();
var _data;
var _operationTheaterData = [];
var message = [];
var red = "#f40000";
var green = "#0fbb5b";
var orange = "#ff8d48";
var alert = "alert-box";
var check = "checkbox-marked";
var minusBox = "minus-box";
function homeScreen(props, route) {
  const [renderFlatlistData, setRenderFlatlistData] = useState();
  const [processMessageData, setProcessMessageData] = useState([]);
  const [loadingProcessData, setloadingProcessData] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
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

  const { data, refetch } = useQuery(GetUserDataById, {
    variables: {
      userId: props.userId,
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.appUsers[0].name);
      setLocation(data.appUsers[0].branch?.name);
    }
  }, [data]);

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
            await apolloClient
              .query({
                query: Check_Process_Progress,
                variables: {
                  // userId: parseInt(props.userId),
                  otID: Result.data.operationTheaters[i].id,
                  date: new Date(),
                },
                fetchPolicy: "network-only",
              })
              .then((response) => {
                console.log("response", response);
                var processData = response.data.appResources;
                let status_arr = [];
                for (var t = 0; t <= 4 - 1; t++) {
                  status_arr[t] = 0;
                }
                process_details: for (var m = 0; m < 4; m++) {
                  var start_count = 0;
                  var instance = 0;
                  for (
                    var q = 0;
                    q < processData[m].process_details.length;
                    q++
                  ) {
                    if (
                      processData[m].process_details[q].processes_data.length >
                      0
                    ) {
                      for (var i in processData[m].process_details[q]
                        .processes_data) {
                        if (
                          processData[m].process_details[q].processes_data[i]
                            .Answer != "False"
                        ) {
                          if (
                            processData[m].process_details[q].processes_data[i]
                              .check_editable
                          ) {
                            instance =
                              processData[m].process_details[q].processes_data[
                                i
                              ].instance;
                            if (m === 2) {
                              status_arr[m] = {
                                instance:
                                  processData[m].process_details[q]
                                    .processes_data[i].instance,
                                status: "success",
                                surgeries:
                                  processData[0].process_details[0]
                                    .processes_data[4].Answer,
                              };
                            } else {
                              status_arr[m] = {
                                instance:
                                  processData[m].process_details[q]
                                    .processes_data[i].instance,
                                status: "success",
                              };
                            }
                            try {
                              var temp =
                                processData[m].process_details[q]
                                  .processes_data[i].check_editable.id;
                            } catch (err) {
                              status_arr[m] = {
                                instance:
                                  processData[m].process_details[q]
                                    .processes_data[i].instance,
                                status: "pending",
                              };

                              break process_details;
                            }
                          }
                        } else if (
                          processData[m].process_details[q].processes_data[i]
                            .Answer == "False"
                        ) {
                          status_arr[m] = {
                            instance:
                              processData[m].process_details[q].processes_data[
                                i
                              ].instance,
                            status: "fail",
                          };
                          break process_details;
                        } else if (
                          processData[m].process_details[q].processes_data
                            .length <
                          processData[m].process_details[q].questions.length - 1
                        ) {
                          status_arr[m] = {
                            instance:
                              processData[m].process_details[q].processes_data[
                                i
                              ].instance,
                            status: "pending",
                          };
                          break process_details;
                        } else {
                          status_arr[m] = {
                            instance:
                              processData[m].process_details[q].processes_data[
                                i
                              ].instance,
                            status: "pending",
                          };
                          break process_details;
                        }
                      }
                    } else {
                      start_count++;
                      //status_arr[m] === 0
                      if (
                        start_count === processData[m].process_details.length
                      ) {
                        status_arr[m] = { status: "start" };
                        //break process_details;
                      } else {
                        status_arr[m] = {
                          instance: instance,
                          status: "pending",
                        };

                        //break process_details;
                      }
                    }
                  }
                }
                global_process_status = [...global_process_status, status_arr];
              });
          }
          console.log("******************", global_process_status);
          var msg = [];
          for (var temp = 0; temp < global_process_status.length; temp++) {
            msg = [
              ...msg,
              getTextForProcessMessage(temp, global_process_status),
            ];
          }
          setProcessMessageData(msg);
          setloadingProcessData(true);
        });
    });

    return unsubscribe;
  }, [props.navigation]);
  const getTextForProcessMessage = (index, global_process_status) => {
    let varArra = global_process_status;
    let message = "Start process";
    let msgObj = { message: "Start process", icon: "play-box", color: "black" };
    if (varArra.length > 0) {
      if (
        varArra[index][0].status === "success" &&
        varArra[index][1].status === "success"
      ) {
        msgObj = {
          message: "Cleared for start of day",
          icon: check,
          color: green,
        };
        message = "Cleared for start of day";
        if (varArra[index][2].status === "success") {
          message = "Cleared for surgery -0" + (varArra[index][2].instance - 1);

          msgObj = { message: message, icon: check, color: green };

          if (varArra[index][3].status === "success") {
            message = "Cleared for end of day";
            msgObj = { message: message, icon: check, color: green };
          } else if (varArra[index][3].status === "pending") {
            message = "Ongoing end of day";

            msgObj = { message: message, icon: minusBox, color: orange };
          } else if (varArra[index][3].status === "fail") {
            message = "Not Cleared for end of day";

            msgObj = { message: message, icon: alert, color: red };
          }
        } else if (varArra[index][2].status === "pending") {
          message = "Ongoing for surgery -0" + (varArra[index][2].instance - 1);

          msgObj = { message: message, icon: minusBox, color: orange };
        } else if (varArra[index][2].status === "fail") {
          message =
            "Not Cleared for surgery -0" + (varArra[index][2].instance - 1);

          msgObj = { message: message, icon: alert, color: red };
        }
      } else if (
        varArra[index][0].status === "fail" ||
        varArra[index][1].status === "fail"
      ) {
        message = "Not Cleared for start of day";

        msgObj = { message: message, icon: alert, color: red };
      } else if (
        varArra[index][0].status === "pending" ||
        varArra[index][1].status === "pending"
      ) {
        message = "Ongoing for start of day";

        msgObj = { message: message, icon: minusBox, color: orange };
      }
    }
    console.log("msgOBJ ======", msgObj);
    return msgObj;
  };
  const renderResources = (item) => {
    return (
      <View style={styles.item}>
        {/* <TouchableOpacity
          style={[styles.appButtonContainer, { flex: 1, flexDirection:'row' }]}
          onPress={() => {
            item.item.__typename == "AppResource"
              ? props.navigation.navigate("processScreen", {
                  userId: props.userId,
                  userType: props.userType,
                  resourceID: item.item.id,
                  operationTheaterID: item.item.id,
                  resourceName: item.item.name,
                })
              : props.navigation.navigate("preProcessScreen", {
                  userId: props.userId,
                  userType: props.userType,
                  operationTheaterID: item.item.id,
                  operationTheaterName: item.item.name,
                });
          }}
        >
          <View
            style={[
              {
                
                //borderRadius:6,
                height: 60,
                width: "100%",
                
                paddingLeft: 20,
                margin: 0,
              },
              { flex: 1 },
            ]}
          >
            <Text style={[styles.appButtonText, { flex: 1, marginRight: 14 }]}>
              {item.item.name}
            </Text>
            {item.index > 0 && (
            <MessageComponent
              message={processMessageData[item.index - 1]}
              
            />
          )}
          </View> 
         
          <View
              style={{
                width: 30,
                height: "100%",
                
                alignContent: "center",
                
                
                 
              }}
            >
              <MaterialCommunityIcons name="arrow-right" size={30} />
            </View>
        </TouchableOpacity> */}
        <OTCard
          title={item.item.name}
          message={item.index > 0 ? processMessageData[item.index - 1] : null}
          onPress={() => {
            item.item.__typename == "AppResource"
              ? props.navigation.navigate("processScreen", {
                  userId: props.userId,
                  userType: props.userType,
                  resourceID: item.item.id,
                  operationTheaterID: item.item.id,
                  resourceName: item.item.name,
                })
              : props.navigation.navigate("preProcessScreen", {
                  userId: props.userId,
                  userType: props.userType,
                  operationTheaterID: item.item.id,
                  operationTheaterName: item.item.name,
                });
          }}
        />
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
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "#ffffff",
                  marginVertical: 16,
                }}
              >
                Hello,
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "#ffffff",
                  marginVertical: 16,
                }}
              >
                {" "}
                {name}
              </Text>
            </View>

            <Divider
              style={{ width: "100%", height: 1, backgroundColor: "#68A4DB" }}
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
                <Text
                  style={[
                    styles.location,
                    Platform.OS === "web" && { marginTop: 5 },
                  ]}
                >
                  {location}
                </Text>
              </View>
              {/* <View style={styles.box2}></View> */}
              <View style={styles.box3}>
                <MaterialCommunityIcons
                  name="calendar-text"
                  style={{ alignSelf: "center", marginHorizontal: 5 }}
                  color="white"
                  size={20}
                />
                <Text
                  style={[
                    styles.location,
                    Platform.OS === "web" && { marginTop: 5 },
                  ]}
                >
                  {date.toDateString()}
                </Text>
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
            <Text style={styles.headerTextStyle}>Today's Progress.</Text>
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
            {renderFlatlistData && loadingProcessData ? (
              <FlatList
                style={{ width: "100%", alignSelf: "center" }}
                data={_data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderResources}
              />
            ) : (
              <ActivityIndicator size={24} color={"#006bcc"} />
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId,
  userType: state.userType,
});
export default connect(mapStateToProps)(withNavigation(homeScreen));

const styles = StyleSheet.create({
  subHeader: {
    marginTop: 32,
    justifyContent: "center",
    width: "90%",
    paddingBottom: 24,
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
    backgroundColor: "#CCE1F4",
  },
  box3: {
    height: "100%",
    flexGrow: 1,
    flexDirection: "row",
    marginLeft: 31,
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
    backgroundColor: "#006bcc",
    marginHorizontal: 24,

    justifyContent: "center",
  },
  location: {
    fontSize: 14,
    color: "#CCE1F4",
    // fontWeight: "bold",
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
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginLeft: 14,
  },
});
