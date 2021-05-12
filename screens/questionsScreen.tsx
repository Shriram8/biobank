import React, { useState, useRef, useEffect } from "react";
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
  DevSettings,
} from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import { client } from "../src/graphql/ApolloClientProvider";
import {
  UpdateSubmitCompleted,
  GetQuestionDetails,
  SubmitAnswerForQuestion,
  UpdateSubmittedAnswerForQuestion,
  SubmitCompleted,
  GetProcessDataDetails
} from "../src/graphql/queries";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RadioGroup, RadioButton } from "react-native-radio-btn";
import DrugListPopover from "./DrugListPopover";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import NetworkComponent from "../src/Components/NetworlComponent";

const apolloClient = client;
const radioItems = [
  {
    id: 1,
    label: "Yes",
  },
  {
    id: 2,
    label: "No",
  },
];
const radioItems_NA = [
  {
    id: 1,
    label: "Yes",
  },
  {
    id: 2,
    label: "No",
  },
  {
    id: 3,
    label: "N/A",
  },
];
const drugList = [
  {
    id: 1,
    label: "View",
  },
];
var dict: string[] = [];
var key;
var value;
var dictId: string[] = [];
var editableId: string[] = [];
var temp = new Array();
var questionCount: number;
var processDataId: any[];
var _processCleared: boolean;
const processNumber_Initial = 1;
const initialProcessQuestionIndex = 2;
var _isInitialProcess: boolean;
var ignoreQuestionsCount: number;
var networkError:Boolean;
var inChargeOverride:Boolean;

var imageAddress = ["../Images/P1.jpg","../Images/P2.jpg"];
const contentButtons = [
    {
        title: "P1",
        image: require("../Images/P1.jpg")
    },
    {
        title: "P2",
        image: require("../Images/P2.jpg")
    },
    {
        title: "P3",
        image: require("../Images/P3.jpg")
    },
    {
        title: "P4",
        image: require("../Images/P4.jpg")
    },
    {
        title: "P5",
        image: require("../Images/P5.jpg")
    },
    {
        title: "P6",
        image: require("../Images/P6.jpg")
    },
    {
        title: "P7",
        image: require("../Images/P7.jpg")
    },
    {
        title: "P8",
        image: require("../Images/P8.jpg")
    },
    {
        title: "P9",
        image: require("../Images/P9.jpg")
    },
    {
        title: "P10",
        image: require("../Images/P10.jpg")
    },
    {
        title: "P11",
        image: require("../Images/P11.jpg")
    },
    {
        title: "P12",
        image: require("../Images/P12.jpg")
    },
    {
        title: "P13",
        image: require("../Images/P13.jpg")
    },
    {
        title: "P14",
        image: require("../Images/P14.jpg")
    },
    {
        title: "P15",
        image: require("../Images/P15.jpg")
    },
    {
        title: "P16",
        image: require("../Images/P16.jpg")
    },
    {
        title: "P17",
        image: require("../Images/P17.jpg")
    },
    {
        title: "P18",
        image: require("../Images/P18.jpg")
    },
    {
        title: "P19",
        image: require("../Images/P19.jpg")
    },
    {
        title: "P20",
        image: require("../Images/P20.jpg")
    },
]
export default function questionsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {
    userId,
    operationTheaterID,
    processID,
    processName,
    instance,
    userType,
    gaValue,
    backgroundColor,
    processPseudoName,
    branch,
    //imageAddress
  } = route.params;
  const [_data, setfetchData] = React.useState(false);
  const [disbaleCompleted, setDisableCompleted] = React.useState(true);
  const [disableButtons, setDisableButtons] = React.useState(false);
  const [override, setOverride] = React.useState(false);
  const [_cleared, setCleared] = React.useState(false);
  const [showDrugList, setShowDrugList] = useState(false);
  const [loadingCompletedButton, setLoadingCompletedButton] = useState(false);
  let { loading, error, data: questions_data, refetch } = useQuery(
    GetQuestionDetails,
    {
      variables: {
        processID: processID,
        Date: new Date().toISOString().slice(0, 10),
        //app_user:userId,
        operation_theater: operationTheaterID,
        instance: instance,
        branch: branch,
      },
    }
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    //console.log("GAAA VALUEEEE",gaValue)
    if (questions_data) {
      //console.log("USER TYPE__",userType)
    }
  }, [questions_data]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //imageAddress = "../Images/"+processPseudoName+".jpg";
      setDisableCompleted(true);
      setOverride(false);
      _processCleared = true;
      _isInitialProcess = false;
      inChargeOverride = false;
      setCleared(true);
      ignoreQuestionsCount = 0;
      apolloClient
        .query({
          query: GetQuestionDetails,
          variables: {
            processID: processID,
            Date: new Date().toISOString().slice(0, 10),
            operation_theater: operationTheaterID,
            instance: instance,
            branch: branch,
          },
          fetchPolicy: "network-only",
        })
        .then((Result) => {
          questions_data = Result.data;
          if (questions_data.processDetail.id == processNumber_Initial) {
            _isInitialProcess = true;
          }
          dict = [];
          dictId = [];
          temp = [];
          processDataId = [];
          editableId = [];
          questionCount = questions_data.processDetail.questions.length;

          if (gaValue == "False") {
            for (var i = 0; i < questionCount; i++) {
              try {
                if (
                  questions_data.processDetail.questions[i].type ==
                    "gaQuestions" ||
                  questions_data.processDetail.questions[i].type == "toggleNA"
                ) {
                  ignoreQuestionsCount = ignoreQuestionsCount + 1;
                }
              } catch {}
            }
            questionCount = questionCount - ignoreQuestionsCount;
          }
          if (questions_data.processesData.length == questionCount) {
           
            if(userType == "OTIncharge" ){
              if(!questions_data.processesData[0].check_editable.processCleared){
                inChargeOverride = true;
                setDisableCompleted(false);
              }
              else{
                setDisableCompleted(true);
              }
            }else
            setDisableCompleted(false);
          }
          if (
            questions_data.processesData.length >= 1 &&
            questions_data.processesData[0].check_editable
          ) {
            setDisableButtons(true);
            if (userType != "OTIncharge") setDisableCompleted(true);
          }

          for (var i = 0; i < questions_data.processesData.length; i++) {
            //console.log(questions_data)
            key = questions_data.processesData[i].question.id;
            value = questions_data.processesData[i].Answer;

            if (value == "False") {
              if (questions_data.processDetail.id != processNumber_Initial) {
                setCleared(false);
              } else if (
                _isInitialProcess &&
                key == initialProcessQuestionIndex
              ) {
                setCleared(false);
                //console.log("Initial Processs,",_isInitialProcess);
              }
            }
            //console.log("Initial Processs,",_isInitialProcess,key);
            dict[key] = value;
            try {
              editableId[key] =
                questions_data.processesData[0].check_editable.id;
            } catch {}
            processDataId.push(questions_data.processesData[i].id);
            dictId[key] = questions_data.processesData[i].id;
            temp.push(key);
          }
          setfetchData(true);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const [mutateFunction, { data:mutationData,error:mutationError, }] = useMutation(SubmitAnswerForQuestion);

  useEffect(() => {
    if (mutationData) {
      dictId[mutationData.createProcessesDatum.processesDatum.question.id] =
        mutationData.createProcessesDatum.processesDatum.id;
      processDataId.push(mutationData.createProcessesDatum.processesDatum.id);
      if (temp.length == questionCount) {
        setLoadingCompletedButton(true);
        apolloClient
        .query({
          query: GetProcessDataDetails,
          variables: {
            processID: processID,
            Date: new Date().toISOString().slice(0, 10),
            operation_theater: operationTheaterID,
            instance: instance,
            branch: branch,
          },
          fetchPolicy: "network-only",
        })
        .then((Result) => {
            setLoadingCompletedButton(false);
            processDataId = [];
            for(var i=0; i<questionCount;i++)
            {
              processDataId.push(Result.data.processesData[i].id);
            }
            setDisableCompleted(false);
        })
      }
    }
  }, [mutationData]);

  const callQuery =  (index: any, value: any) => {
    temp.push(index);
    dictId[index]; 
    
    mutateFunction({
        variables: {
          operation_theater: parseInt(operationTheaterID),
          question: parseInt(index),
          app_user: parseInt(userId),
          process_detail: parseInt(processID),
          Date: new Date().toISOString().slice(0, 10),
          Answer: value,
          instance: instance,
          branch: branch
        },
    });
  };

  let [updateFunction, { data: updateFunctiondata, }] = useMutation(
    UpdateSubmittedAnswerForQuestion
  );

  const updateQuery = (index: any, value: any) => {
    updateFunction({
      variables: {
        question_Id: parseInt(index),
        Answer: value,
        branch:branch
      },
    });
  };

  const sendQuery = (index: any, value: any, type: number) => {
    if (type) {
      if (value == 0) {
        value = "True";
      } else if (value == 1) {
        value = "False";
      } else if (value == 2) {
        value = "N/A";
      }
      if (value == "False") {
        if (!_isInitialProcess) {
          _processCleared = false;
          setCleared(false);
        } else {
          if (index == initialProcessQuestionIndex) {
            _processCleared = false;
            setCleared(false);
          }
        }
      }
    }
    if (temp.indexOf(index) != -1) {
      updateQuery(dictId[index], value);
    } else callQuery(index, value);
  };

  const [mutateEditableFunction, { data: SubmitEditableData }] = useMutation(
    SubmitCompleted
  );
  const [updateEditableFunction, { data: UpdateEditableData }] = useMutation(
    UpdateSubmitCompleted
  );

  const submitEditable = () => {
    //console.log("Process Cleared---",_processCleared)
    setDisableButtons(true);
    setDisableCompleted(true);
    if (userType == "OTIncharge" && inChargeOverride) {
      setCleared(true);
      for (var i = 0; i < temp.length; i++) {
        console.log(dict,processDataId,dictId,temp)
        if (dict[temp[i]] == "False") {
          updateQuery(dictId[temp[i]], "True");
          updateEditableFunction({
            variables: {
              checkEditable_Id: parseInt(editableId[temp[i]]),
            },
          });
        }
        setOverride(true);
      }
    } else {
      mutateEditableFunction({
        variables: {
          processes_data: processDataId.map(Number),
          processCleared: _processCleared,
          branch:branch,
        },
      });
    }
    setModalVisible(true);
  };

  const renderResources = ({ item, index }: { item: any; index: number }) => {
    if (gaValue == "False") {
      if (item.type == "gaQuestions") return;
      else if (item.type == "toggleNA") return;
    }
    return (
      <View style={[styles.item, index == 0 && { marginTop: 0 }]}>
        <DrugListPopover
          alert={showDrugList}
          onContinue={() => setShowDrugList(false)}
          close={() => setShowDrugList(false)}
        />
        <Text style={[styles.appButtonText, { flex: 1, marginBottom: 16 }]}>
          {item.Question}
        </Text>
        {item.type == "drugList" ? (
          <Button
            mode="text"
            onPress={() => setShowDrugList(true)}
            style={{ alignItems: "flex-start" }}
          >
            Drugs List
          </Button>
        ) : null}
        {item.type == "value_based" ? (
          <>
            <Picker
              selectedValue={dict[item.id]}
              enabled={!disableButtons}
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
              onValueChange={(itemValue, itemIndex) =>
                sendQuery(item.id, itemValue, 0)
              }
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="01" value="1" />
              <Picker.Item label="02" value="2" />
              <Picker.Item label="03" value="3" />
              <Picker.Item label="04" value="4" />
              <Picker.Item label="05" value="5" />
              <Picker.Item label="06" value="6" />
              <Picker.Item label="07" value="7" />
              <Picker.Item label="08" value="8" />
              <Picker.Item label="09" value="9" />
            </Picker>
          </>
        ) : item.type == "surgeon" ? (
          <>
            <Picker
              selectedValue={dict[item.id]}
              enabled={!disableButtons}
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
              onValueChange={(itemValue, itemIndex) =>
                sendQuery(item.id, itemValue, 0)
              }
            >
              <Picker.Item label="Select Surgeon" value="Not Selected" />
              <Picker.Item label="Surgeon 1" value="Surgeon 1" />
              <Picker.Item label="Surgeon 2" value="Surgeon 2" />
              <Picker.Item label="Surgeon 3" value="Surgeon 3" />
              <Picker.Item label="Surgeon 4" value="Surgeon 4" />
              <Picker.Item label="Surgeon 5" value="Surgeon 5" />
              <Picker.Item label="Surgeon 6" value="Surgeon 6" />
              <Picker.Item label="Surgeon 7" value="Surgeon 7" />
              <Picker.Item label="Surgeon 8" value="Surgeon 8" />
              <Picker.Item label="Surgeon 9" value="Surgeon 9" />
              <Picker.Item label="Surgeon 10" value="Surgeon 10" />
            </Picker>
          </>
        ) : item.type == "toggleNA" ? (
          <RadioGroup
            selectedIndex={
              dict[item.id] == "True"
                ? 0
                : dict[item.id] == "False"
                ? override
                  ? 0
                  : 1
                : dict[item.id] == "N/A"
                ? 2
                : null
            }
            onSelect={(index: any, value: any) => sendQuery(item.id, index, 1)}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {radioItems_NA.map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  value={item.label}
                  displayText={item.label}
                  displayTextColor="#959595"
                  displayTextActiveColor="#fff"
                  prefixColor="#006bcc"
                  prefixActiveColor="#006bcc"
                  style={{
                    width: 60,
                    height: 40,
                    borderRadius: 8,
                    alignContent: "center",
                    borderWidth: 1,
                    borderColor: "#979797",
                  }}
                  disabled={disableButtons}
                />
              );
            })}
          </RadioGroup>
        ) : item.type == "drugList" ? (
          <RadioGroup
            selectedIndex={dict[item.id] == "True" ? 0 : null}
            onSelect={(index: any, value: any) => sendQuery(item.id, index, 1)}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {radioItems.map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  value={item.label}
                  displayText={item.label}
                  x
                  displayTextColor="#959595"
                  displayTextActiveColor="#fff"
                  prefixColor="#006bcc"
                  prefixActiveColor="#006bcc"
                  style={{
                    width: 120,
                    height: 40,
                    borderRadius: 8,
                    alignContent: "center",
                    borderWidth: 1,
                    borderColor: "#979797",
                  }}
                  disabled={disableButtons}
                />
              );
            })}
          </RadioGroup>
        ) : item.type == "gaQuestions" ? (
          <RadioGroup
            selectedIndex={
              override
                ? 0
                : dict[item.id] == "True"
                ? 0
                : dict[item.id] == "False"
                ? 1
                : null
            }
            onSelect={(index: any, value: any) => sendQuery(item.id, index, 1)}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {radioItems.map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  value={item.label}
                  displayText={item.label}
                  displayTextColor="#959595"
                  displayTextActiveColor="#fff"
                  prefixColor="#006bcc"
                  prefixActiveColor="#006bcc"
                  style={{
                    width: 120,
                    height: 40,
                    borderRadius: 8,
                    alignContent: "center",
                    borderWidth: 1,
                    borderColor: "#979797",
                  }}
                  disabled={disableButtons}
                />
              );
            })}
          </RadioGroup>
        ) : item.type == "toggle" ||
          item.type == "ga" ||
          item.type == "value" ? (
          <RadioGroup
            selectedIndex={
              override
                ? 0
                : dict[item.id] == "True"
                ? 0
                : dict[item.id] == "False"
                ? 1
                : null
            }
            onSelect={(index: any, value: any) => sendQuery(item.id, index, 1)}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {radioItems.map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  value={item.label}
                  displayText={item.label}
                  displayTextColor="#959595"
                  displayTextActiveColor="#fff"
                  prefixColor="#006bcc"
                  prefixActiveColor="#006bcc"
                  style={{
                    width: 120,
                    height: 40,
                    borderRadius: 8,
                    alignContent: "center",
                    borderWidth: 1,
                    borderColor: "#979797",
                  }}
                  disabled={disableButtons}
                />
              );
            })}
          </RadioGroup>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const getStyle = () => {
    if (_cleared) {
      return [
        styles.headerTextStyle,
        { margin: 10, fontSize: 18, color: "green" },
      ];
    } else
      return [
        styles.headerTextStyle,
        { margin: 10, fontSize: 18, color: "red" },
      ];
  };

  return (
    <>
      <Provider>
        {modalVisible && (
          <Portal>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <View
                style={{ width: "100%", height: 142, backgroundColor: "white" }}
              >
                <View style={{ height: 102 }}>
                  <Text style={getStyle()}>
                    {_cleared ? "Process Completed" : "Process Incomplete"}
                  </Text>
                  <Text
                    style={[
                      styles.headerTextStyle,
                      { margin: 10, fontSize: 14, fontWeight: "normal" },
                    ]}
                  >
                    {_cleared
                      ? "Continue finishing next tasks"
                      : "Contact OT-Incharge to complete the tasks."}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  color={"#006bcc"}
                  style={{
                    width: "100%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.goBack()}
                >
                  Continue
                </Button>
              </View>
            </View>
          </Portal>
        )}
        <StatusBar animated={true} backgroundColor="#ff8d48" hidden={false} />

        <View
          style={{ backgroundColor: backgroundColor, width: "100%", height: "100%" }}
        >
          <View style={[styles.header,{backgroundColor: backgroundColor}]}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              source={contentButtons[processPseudoName-1].image}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 30,
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                height: 50,
                marginLeft: 22,
                marginVertical: 36,
              }}
            >
              <Text style={[styles.headerTextStyle, { fontSize: 16 }]}>
                {processName}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
              }}
            >
              {_data && (
                <FlatList
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    paddingHorizontal: 40,
                  }}
                  data={questions_data.processDetail.questions}
                  keyExtractor={(item, index) => item.id}
                  renderItem = {renderResources}
                />
              )}
            </View>
            <View style={{ justifyContent: "space-around" }}>
              <Button
                mode="contained"
                color={disbaleCompleted?"#959595":"#006bcc"}
                dark
                //disabled={disbaleCompleted}
                loading={loadingCompletedButton}
                style={{
                  width: "100%",
                  height: 40,
                  justifyContent: "center",
                  alignSelf: "center",
                  
                }}
                onPress={() => {if(!disbaleCompleted){submitEditable();}}}
              >
                {userType == "OTIncharge" && inChargeOverride ? "Override" : "Completed"}
              </Button> 

            </View>
          </View>
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  headerTextLabel: {
    width: "90%",
    height: 25,
    marginTop: 25,
    marginBottom: 15,
    justifyContent: "center",
  },
  headerTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
  },
  header: {
    //backgroundColor: '#ff8d48',
    alignItems: 'center',
    justifyContent: 'center',
    height:150
  },
  container: {
    marginTop: 150,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderTopLeftRadius: 30,
    height: "100%",
  },
  item: {
    marginVertical: 16,
    width: "100%",
  },
  title: {
    fontSize: 32,
  },
  appButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    margin: 10,
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
    fontWeight: "normal",
    textAlign: "left",
    textAlignVertical: "center",
  },
});
