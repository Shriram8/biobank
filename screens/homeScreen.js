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
import {
  GetAutoClaveDetails,
  GetResourcesDetails,
  GetSurgeryDetails_OTStaff,
  preProcessProgress_OTStaff,
} from "../src/graphql/queries";
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
let global_process_status = [];
var _operationTheaterData = [];
var message = [];
var red = "#f40000";
var green = "#0fbb5b";
var orange = "#ff8d48";
var alert = "alert-box";
var check = "checkbox-marked";
var minusBox = "minus-box";
let _data = [];
let ot_data = [];
const preSurgeryProcessCount = 2;
const preSurgeryProcessID = 3; //id from order.
const inBetweenSurgeryProcessID = 4;
let lock = [];
let moduleLock;
var progress = [];
var colorValue = [];
var iconValue = [];
var processCount = [];
var netProgress = [];
var _text;
var red = "#f40000";
var green = "#0fbb5b";
var orange = "#ff8d48";
var alert = "alert-box";
var check = "checkbox-marked";
var minusBox = "minus-box";
var _Result = [];
var _length;
var _headerColor;
let autoClavemsg = {};
function homeScreen(props, route) {
  const [renderFlatlistData, setRenderFlatlistData] = useState();
  const [processMessageData, setProcessMessageData] = useState([]);
  const [loadingProcessData, setloadingProcessData] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [resultsFetched, setResultsFetched] = useState(0);

  const [global_message, setGlobalMessage] = useState([]);
  const [flatlistrender, setflatlistrender] = useState(false);
  const [message, setMessage] = useState(null);
  const [headerColor, setHeaderColor] = useState("");
  const [headerIcon, setHeaderIcon] = useState("");
  const [autoClaveCleared, setAutoClaveCleared] = useState(true);

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
    fetchPolicy: "network-only",
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
      setloadingProcessData(false);
      apolloClient
        .query({
          query: GetSharedResource_OperationTheaters,
          fetchPolicy: "network-only",
        })
        .then(async (Result) => {
          ot_data = Result.data.appResources.concat(
            Result.data.operationTheaters
          );

          setRenderFlatlistData(Result.data);

          // console.log("************Result.data.operationTheaters[i]",Result.data.operationTheaters[0].id)
          for (var i = 0; i < Result.data.operationTheaters.length; i++) {
            // console.log("************Result.data.operationTheaters[i]",Result.data.operationTheaters[i].id)
            let otId = Result.data.operationTheaters[i].id;
            processCount = [];
            progress = [];
            netProgress = [];
            _text = "Ongoing start of the day";
            _data = [];
            lock = [];
            _Result = [];
            _length = 0;
            colorValue = [];
            iconValue = [];
            moduleLock = false;

            await apolloClient
              .query({
                query: GetSurgeryDetails_OTStaff,
                variables: {
                  operation_theater: parseInt(otId),
                  Date: new Date().toISOString().slice(0, 10),
                  // app_user:parseInt(userId),
                },
                fetchPolicy: "network-only",
              })
              .then(async (Result) => {
                //console.log("-----Result",Result);
                for (var i = 0; i < 2; i++) {
                  _data.push(Result.data.appResources[i]);

                  if (i == 0) {
                    lock.push(false);
                  } else {
                    lock.push(true);
                  }
                }
                try {
                  for (
                    var i = 0;
                    i < Result.data.questions[0].processes_data[0].Answer;
                    i++
                  ) {
                    if (i == 0) {
                      _data.push(
                        Result.data.appResources[preSurgeryProcessID - 1]
                      );
                    } else
                      _data.push(
                        Result.data.appResources[inBetweenSurgeryProcessID - 1]
                      );
                    lock.push(true);
                  }
                } catch {}
                _data.push(
                  Result.data.appResources[Result.data.appResources.length - 1]
                );
                lock.push(true);
                //console.log("Data---",_data);
                setRenderFlatlistData(Result.data);
                for (var i = 0; i < _data.length; i++) {
                  colorValue[i] = orange;
                  iconValue[i] = minusBox;
                  processCount[i] = _data[i].process_details.length;
                  progress[i] = 0;
                  _length = _length + processCount[i];
                  for (var k = 0; k < processCount[i]; k++) {
                    await apolloClient
                      .query({
                        query: preProcessProgress_OTStaff,
                        variables: {
                          operation_theater: parseInt(otId),
                          Date: new Date().toISOString().slice(0, 10),
                          //app_user:parseInt(userId),
                          instance: i,
                          process_detail: _data[i].process_details[k].id,
                        },
                        fetchPolicy: "cache-only",
                      })
                      .then((Result) => {
                        _Result.push(Result.data);
                        if (_Result.length == _length) {
                          setResultsFetched((prevCount) => prevCount + 1);
                          if (_Result.length == _length) {
                            for (var k = 0; k < _Result.length; k++) {
                              try {
                                if (
                                  _Result[k].processesData[0].check_editable
                                ) {
                                  //console.log("instance-----",_Result[k].processesData[0]);
                                  var p = _Result[k].processesData[0].instance;
                                  progress[p] = progress[p] + 1;
                                  netProgress[p] =
                                    progress[p] / processCount[p];
                                  if (
                                    netProgress[p] == 1 &&
                                    _Result[k].processesData[0].check_editable
                                      .processCleared
                                  ) {
                                    if (colorValue[p] != red) {
                                      colorValue[p] = green;
                                      iconValue[p] = check;
                                      lock[p + 1] = false;
                                      setUpdateMessage(
                                        (prevCount) => prevCount + 1
                                      );
                                    }
                                  }
                                  if (
                                    netProgress[p] > 0 &&
                                    netProgress[p] < 1
                                  ) {
                                    if (colorValue[p] != red) {
                                      colorValue[p] = orange;
                                      iconValue[p] = minusBox;
                                    }
                                  }
                                  if (
                                    !_Result[k].processesData[0].check_editable
                                      .processCleared
                                  ) {
                                    colorValue[p] = red;
                                    iconValue[p] = alert;
                                    lock[p + 1] = true;
                                  }
                                }
                                setRefresh((prevCount) => prevCount + 1);
                              } catch {}
                            }
                          }
                        }
                      });
                  }
                }
              });
            global_process_status.push(setHeaderText());
            // setGlobalMessage(global_process_status)

            // global_process_status=[];
            lock = [];
            moduleLock;
            progress = [];
            colorValue = [];
            iconValue = [];
            processCount = [];
            netProgress = [];
          }

          setGlobalMessage(global_process_status);
          global_process_status = [];
          setflatlistrender(!flatlistrender);
          setloadingProcessData(true);
        });

      return unsubscribe;
    });
  }, [props.navigation]);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      setAutoClaveCleared(false);
      var process = 3;
      var temp = 0;
      autoClavemsg = {
        message: "AutoClave not cleared",
        color: red,
        icon: minusBox,
      };
      await apolloClient
        .query({
          query: GetAutoClaveDetails,
          variables: {
            Date: new Date().toISOString().slice(0, 10),
          },
          fetchPolicy: "network-only",
        })
        .then((Result) => {
          for (var i = 0; i < Result.data.processDetails.length; i++) {
            try {
              if (
                Result.data.processDetails[i].processes_data[0].check_editable
                  .processCleared
              ) {
                temp = temp + 1;
              }
            } catch {}
          }

          if (temp == process) {
            setAutoClaveCleared(true);
            autoClavemsg = {
              message: "AutoClave cleared",
              color: green,
              icon: check,
            };
          }
        });
    });
    return unsubscribe;
  }, [props.navigation]);
  const setHeaderText = () => {
    //console.log("NET PROGRESS LENGTH--",netProgress.length,).
    let icon = "play-box";
    let color = "#000";
    let msg = "Start process";
    let process_Message = {
      message: msg,
      icon: icon,
      color: color,
    };

    switch (colorValue[netProgress.length - 1]) {
      case red:
        //console.log("RED")
        if (netProgress.length <= preSurgeryProcessCount) {
          setMessage("Not Cleared for start of day");
          msg = "Not Cleared for start of day";
          icon = alert;
          color = red;
        } else if (netProgress.length == processCount.length) {
          setMessage("Not Cleared for end of day");
          msg = "Not Cleared for end of day";
          icon = alert;
          color = red;
        } else {
          var temp =
            "Not Cleared for surgery -0" +
            (netProgress.length - preSurgeryProcessCount);
          msg = temp;
          icon = alert;
          color = red;
          setMessage(temp);
        }
        process_Message = {
          message: msg,
          icon: icon,
          color: color,
        };
        return process_Message;
        break;
      case orange:
        //console.log("ORANGE")
        if (netProgress.length <= preSurgeryProcessCount) {
          setMessage("Ongoing for start of day");
          msg = "Ongoing for start of day";

          icon = minusBox;
          color = orange;
        } else if (netProgress.length == processCount.length) {
          setMessage("Ongoing end of day");
          msg = "Ongoing end of day";

          icon = minusBox;
          color = orange;
        } else {
          var temp =
            "Ongoing for surgery -0" +
            (netProgress.length - preSurgeryProcessCount);
          msg = temp;
          icon = minusBox;
          color = red;
          setMessage(temp);
        }
        process_Message = {
          message: msg,
          icon: icon,
          color: color,
        };

        return process_Message;
        break;
      case green:
        //console.log("GREEN")
        if (netProgress.length < preSurgeryProcessCount) {
          setHeaderColor(orange);
          setHeaderIcon(minusBox);
          setMessage("Ongoing for start of day");
          msg = "Ongoing for start of day";
          icon = minusBox;
          color = orange;
          process_Message = {
            message: msg,
            icon: icon,
            color: color,
          };

          return process_Message;
          break;
        }
        if (netProgress.length == preSurgeryProcessCount) {
          if (!autoClaveCleared) {
            lock[preSurgeryProcessCount] = true;
            setHeaderColor(red);
            setHeaderIcon(minusBox);
            setMessage("AutoClave not cleared");
            msg = "AutoClave not cleared";
            icon = alert;
            color = red;
          } else {
            setMessage("Cleared for start of day");
            msg = "Cleared for start of day";
            icon = check;
            color = green;
          }
          autoClavemsg = {
            message: "Autoclave cleared",
            icon: check,
            color: green,
          };
        } else if (netProgress.length == processCount.length) {
          setMessage("Cleared for end of day");
          msg = "Cleared for end of day";
          icon = check;
          color = green;
        } else {
          var temp =
            "Cleared for surgery -0" +
            (netProgress.length - preSurgeryProcessCount);
          msg =
            "Cleared for surgery -0" +
            (netProgress.length - preSurgeryProcessCount);
          icon = check;
          color = green;
          setMessage(temp);
        }

        process_Message = {
          message: msg,
          icon: icon,
          color: color,
        };

        return process_Message;
        break;
    }
    if (netProgress[netProgress.length - 1] == 1) {
      if (colorValue[netProgress.length - 1] == green) {
      }
    }
    return process_Message;
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
          message={
            item.index > 0 ? global_message[item.index - 1] : autoClavemsg
          }
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
                {name}
              </Text>
            </View>

            <Divider
              style={{ width: "100%", height: 1, backgroundColor: "#68A4DB" }}
            />
          </View>
          <View style={styles.subHeader}>
            <View style={styles.flexContainer}>
              <View
                style={[styles.box1, Platform.OS !== "web" && { width: 120 }]}
              >
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  style={{ alignSelf: "center", marginHorizontal: 5 }}
                  color="white"
                  size={20}
                />
                <Text style={styles.location}>{location}</Text>
              </View>
              {/* <View style={styles.box2}></View> */}
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
                extraData={flatlistrender}
                style={{ width: "100%", alignSelf: "center" }}
                data={ot_data}
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
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginLeft: 14,
  },
});
