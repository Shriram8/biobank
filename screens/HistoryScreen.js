import { useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { GET_ALL_OTS } from "../src/graphql/AlertQueries";
import { getDate, getPrevSevenDays } from "../utility/utility";
import DateTimePicker from "@react-native-community/datetimepicker";
import GenerateHistoryCSV from "./HistoryComponents/GenerateHistoryCSV";
const HistoryScreen = () => {
  //ID for current selected operation Theatre
  const [selectedOT, setSelectedOT] = useState("");
  //Date -when selected prev 7 dates are displayed along with this date
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Modal to render loader while fetching OT data and converting to csv
  const [modalVisible,setModalVisible] = useState(false)
  const { data, error, loading } = useQuery(GET_ALL_OTS, {
    fetchPolicy: "network-only",
  });
  if (data) { 
    if (selectedOT === "") { 
      setSelectedOT(data.operationTheaters[0].id);
    }
  }
  if (error) { }
  //Date TimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setSelectedDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  //Function to hide portal after generating csv file
  const hidePortal=()=>{
      setModalVisible(false)
  }
  //Component to render Operation theatres in Flatlist
  const renderOts = ({ item, index }) => {
    return (
      <View
        key={"OTS_" + index}
        style={[
          styles.headerItem,
          { backgroundColor: selectedOT === item.id ? "#006bcc" : "#959595" },
        ]}
      >
        <TouchableOpacity
          labelStyle={{ color: "#fff" }}
          onPress={() => {
            setSelectedOT(item.id);
          }}
        >
           
          <Text>{item.name}</Text> 
        </TouchableOpacity>
      </View>
    );
  };
  const renderDates = ({ item, index }) => {
    return (
      <View style={styles.dateContainer}>
        <Text>{getDate(getPrevSevenDays(selectedDate, item))}</Text>
        <TouchableOpacity
          onPress={() => {
              setModalVisible(true)
            console.log(
              "download csv file",
              getPrevSevenDays(selectedDate, item)
            );
          }}
        >
          <AntDesign name="download" size={24} color={"#959595"} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      {data && (
        <>
          {data.operationTheaters.length > 0 ? (
            <>
              <View>
                <View style={styles.dateInput}>
                  <Text>{getDate(getPrevSevenDays(selectedDate, 0))}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      showMode("date");
                    }}
                  >
                    <AntDesign name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginHorizontal: 12 }}>
                <FlatList
                  horizontal
                  data={data.operationTheaters}
                  renderItem={renderOts}
                  extraData={selectedOT}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={[0, 1, 2, 3, 4, 5, 6]}
                  renderItem={renderDates}
                  extraData={selectedDate}
                />
              </View>
            </>
          ) : (
            <Text>Empty Components </Text>
          )}
        </>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
     {modalVisible&&(
          <Portal
          visible={modalVisible}
    
          >
         <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.6)",marginTop:26,alignItems:'center',justifyContent:'center'}}>
         <GenerateHistoryCSV
         selectedOT={selectedOT}
         selectedDate={selectedDate}
         hidePortal={hidePortal}
         />
         </View>
          </Portal>
     )}
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerItem: {
    paddingHorizontal: 12,
    margin: 8,
    height:40,
    paddingHorizontal:18,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 8,
  },
  dateContainer: {
    margin: 12,
    padding: 12,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: 60,
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
});
export default HistoryScreen;
