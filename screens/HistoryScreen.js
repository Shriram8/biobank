import { useQuery } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Modal, Portal, Snackbar } from "react-native-paper";
import { GET_ALL_OTS } from "../src/graphql/AlertQueries";
import { getDate, getPrevSevenDays } from "../utility/utility";
import DateTimePicker from "@react-native-community/datetimepicker";
import GenerateHistoryCSV from "./HistoryComponents/GenerateHistoryCSV";

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import EmptyComponent from "../src/Components/EmptyComponent";


//To create a directory in expo
// const createDirectory =async  ()=>{
//     try {
//         let folder = FileSystem.documentDirectory +"testfolder2"
//         await FileSystem.makeDirectoryAsync(folder)
        // var fi = await FileSystem.getInfoAsync(folder);

        // console.log("==================================",JSON.stringify(fi))
        // var fi = await FileSystem.getInfoAsync(folder);
  
//         alert(JSON.stringify(fi))
//       } catch(error) {
//         alert(error)
//       }
// }
const HistoryScreen = () => {
  //ID for current selected operation Theatre
  const [selectedOT, setSelectedOT] = useState("");
  //Date -when selected prev 7 dates are displayed along with this date
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [datePrevIndex,setDatePrevIndex] = useState(0)
  const [fileDownloadControl,setFileDownloadControl] = useState(false)
  //Modal to render loader while fetching OT data and converting to csv
  const [modalVisible,setModalVisible] = useState(false)
  //Snack bar related states
  const [snackText,setsnackText ] = useState("")
  const  [snackVisible,setsnackVisible] = useState(false)
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

  const hideSnackBar = ()=>{
      setsnackVisible(false)
  }
  //Function to dowload file to local storage
  const saveFile = async (fileName, data) => {
    
   
        //await createDirectory()
        let fileUri = FileSystem.documentDirectory + fileName; 
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 }) 
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        var fi = await FileSystem.getInfoAsync(fileUri); 
        hidePortal();
        setsnackVisible(true)
        setsnackText("Your OT details download is ready.")
  
}
const downloadCsv = async () => {
    
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    
    if (status === "granted") {
      setModalVisible(true)
      setFileDownloadControl(true)
      setDatePrevIndex(index)
    }else if(status==="denied"){
      setsnackText("Please grant storage permission to download report.")
      setsnackVisible(true)
    } 
  
}
  //Component to render Operation theatres in Flatlist
  const renderOts = ({ item, index }) => {
    return (
      <View
        key={"OTS_"+index}
        style={[
          styles.headerItem,
          { backgroundColor: selectedOT === item.id ? "#006bcc" : "#959595" },
          index===0&&{marginLeft:0}
        ]}
      >
        <TouchableOpacity
          labelStyle={{ color: "#fff" }}
          onPress={() => {
            setSelectedOT(item.id);
          }}
        >
           
          <Text style={{color:"#fff"}}>{item.name}</Text> 
        </TouchableOpacity>
      </View>
    );
  };
  const renderDates = ({ item, index }) => {
    return (
      <View key={"dates_"+index} style={styles.dateContainer}>
        <Text style={{fontSize:16,fontWeight:'700'}}>{getDate(getPrevSevenDays(selectedDate, item))}</Text>
        <TouchableOpacity
          onPress={downloadCsv}
        >
          <AntDesign name="download" size={24} color={"#000000"} />
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
                  <Text style={{fontSize:16,fontWeight:'700'}}>{getDate(getPrevSevenDays(selectedDate, 0))}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      showMode("date");
                    }}
                  >
                    <AntDesign name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginHorizontal: 24 }}>
                <FlatList
                  horizontal
                  data={data.operationTheaters}
                  renderItem={renderOts}
                  extraData={selectedOT}
                />
              </View>
              
              <View style={{ flex: 1 }}>
              <Text style={[styles.appButtonText,{ marginTop:28, marginHorizontal:24, fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical:"center", }]}>Past records</Text>
                <FlatList
                  data={[0, 1, 2, 3, 4, 5, 6]}
                  renderItem={renderDates}
                  extraData={selectedDate}
                />
              </View>
            </>
          ) : (
            <EmptyComponent title="No Operation Theatres!"/>
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
          <Portal >
         <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.6)",marginTop:26,alignItems:'center',justifyContent:'center'}}>
         <GenerateHistoryCSV
         setFileDownloadControl={setFileDownloadControl}
         fileDownloadControl={fileDownloadControl}
         setsnackText={setsnackText}
         setsnackVisible={setsnackVisible}
         saveFile={saveFile}
         selectedOT={selectedOT}
         selectedDate={getPrevSevenDays(selectedDate,datePrevIndex)}
         hidePortal={hidePortal}
         />
         </View>
          </Portal>
     )}
     <Snackbar
     duration={2000}
     onDismiss={hideSnackBar}
     visible={snackVisible}
     >
         {snackText}
     </Snackbar>
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
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 8,
  },
  dateContainer: {
    margin: 12,
    marginVertical:24,
    padding: 12,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: 60,
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation:2
  },
  dateInput: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginVertical : 36,
    paddingHorizontal:36,
    height:60,
    alignItems:'center',
    elevation:2
  },
});
export default HistoryScreen;
