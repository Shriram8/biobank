import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import {Button } from "react-native-paper";
import {
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from "../src/graphql/ApolloClientProvider";
import {
  UploadSAcute1,UploadPatient_metadata
} from "../src/graphql/queries";

import { useMutation } from "@apollo/client";
const buttonRef = React.createRef();
const apolloClient = client;
var temp;
export default function CSVReader1 (){

  //const [addSAcute1, { data, loading, error }] = useMutation(UploadSAcute1);
  const [addPatient_metadata, { data, loading, error }] = useMutation(UploadPatient_metadata)


  if(data){
    console.log("Dataaaaa---",data)
  }

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    console.log('---------------------------');
    // console.log(data);
    console.log('---------------------------');
    uploadData(data);
  };

  const uploadData = (data) =>{
    var pcr_plus_date;
    var visit_date;
    for(var i = 1; i<data.length-1; i++){
      temp = data[i].data
      // var pcr_plus_date = new Date(temp[2]).toISOString().slice(0, 10)?
      try{
        pcr_plus_date = new Date(temp[2]).toISOString().slice(0, 10)
        visit_date = new Date(temp[3]).toISOString().slice(0, 10)
      }catch{
        pcr_plus_date = null
        visit_date = null
      }
      
      addPatient_metadata({
        variables: {
          Record_ID:temp[0],
          Consent_date:pcr_plus_date,
          Date_of_Positive_SARSCOV2_PCR: pcr_plus_date,
          End_Date : visit_date,
         // days_post_pcr_plus : parseInt(temp[4])
        },
      });
      
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <Button
                mode="contained"
                color={"#366992"}
                uppercase={false}
                style={[styles.reset,{marginVertical:5}]}
                labelStyle={{ fontSize: 16 }}
                onPress={
                  handleOpenDialog
                }
              >
              Browse file
            </Button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%',
                }}
              >
                {file && file.name}
              </div>
              <Button
                mode="contained"
                color={"#a01919"}
                uppercase={false}
                // icon="delete"
                
                style={
                  [{
                  justifyContent: "center",
                  borderRadius: 0,
                  marginVertical:5

                }]}
                labelStyle={{ fontSize: 16 }}
                onPress={
                  handleRemoveFile
                }
              >
                <Icon name="trash" size={24} color="#fff" />
                </Button>
            </aside>
          )}
        </CSVReader>
      </>
    );
  
}

const styles = StyleSheet.create({
  reset: {
    width: '30%',
    justifyContent: "center",
  },
});
