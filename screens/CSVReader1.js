import React, { Component, useState } from 'react';
import { CSVReader } from 'react-papaparse';
import {Button } from "react-native-paper";
import {
 StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from "../src/graphql/ApolloClientProvider";
import {
  UploadPatient_metadata, UploadPatient_Inventories,UploadUninfected_Metadata,UploadUninfected_Inventory,addPatient_Inventories
} from "../src/graphql/queries";

import { useMutation } from "@apollo/client";
import {a,homeScreen} from './homeScreen';
const buttonRef = React.createRef();
const apolloClient = client;
var temp;
export default function CSVReader1 () {
 
 var [addPatient_metadata, { data, loading, error }] = useMutation(UploadPatient_metadata)
 var [addPatient_Inventories, { data, loading, error }] = useMutation(UploadPatient_Inventories)
 var [addUninfected_metadata, { data, loading, error }] = useMutation(UploadUninfected_Metadata)
 var [addUninfected_Inventory, {data,loading, error}] = useMutation(UploadUninfected_Inventory)
 const [TableNumber,setTableNumber] = useState(1);
 const itemValues = ['Patient_Metadata','Uninfected_Metadata','Patient_Inventory','Uninfected_Inventory']
   
 const handleOpenDialog = (e) => {
   // Note that the ref is set async, so it might be null at some point
   console.log("dior")
   if (buttonRef.current) {
     buttonRef.current.open(e);
   }
 };
 
 
 const handleOnFileLoad = (data) => {
  switch(a){
    case 1 :
      console.log("a1",data)
      return uploadData1(data);
    case 2 :
      console.log("a2",a)
      return uploadData2(data);
    case 3 :
      console.log("a3",a)
      return uploadData3(data);
    case 4 :
      console.log("a1",a)
      return uploadData4(data);

  }  
 };
 //Patient_metadata
 const uploadData1 = (data) =>{
 var Record_ID
 var Consent_date
 var Date_of_Positive_SARSCOV2_PCR
 var End_Date
 var Date_of_Birth
 var Disease_Severity_Category
 var Age
 var Age_range
 var Sex
 var Race_or_Ethnicity
 var Height_in_mts
 var Weight_in_kg
 var BMI
 var BMI_Range_in_Text
 var Employed
 var Tobacco_Use
 var packs_per_day
 var number_of_years
 var How_many_other_individuals_are_in_the_participants_household
 var Zipcode
 var Date_of_first_collection
 var Number_of_days_between_PCR_plus_and_first_collection
 var Date_of_second_collection
 var Number_of_days_between_PCR_plus_and_second_collection
 var Date_of_third_collection
 var Number_of_days_between_PCR_plus_and_third_collection
 var Date_of_fourth_collection
 var Number_of_days_between_PCR_plus_and_fourth_collection
 var Date_of_fifth_collection
 var Number_of_days_between_PCR_plus_and_fifth_collection
 var Hospitalized
 var Intubation
 var Oxygen_used_at_hospital
 var If_yes_how_much_oxygen
 var Diagnosed_with_DVT_or_PE_clot_after_diagnosis
 var If_yes_to_VTE_was_it_a_PE_or_DVT
 var If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE
 var Medications_Taking_at_Time_of_COVID19_diagnosis
 var Past_Medical_History
 var Other_Complications
 var convalescent_plasma
 var first_dose_conval_plasma
 var Initial_COVID_Symptoms
 var visit_count
 var Visit_date
 var days_post_PCR
 var No_PASC_is_0_PASC_is_1
 var any_symptoms
 var headache
 var dizziness
 var loss_of_consciousness
 var deafness
 var numbness_in_extremities
 var tingling_inextremities
 var burning_sensation_in_extremities
 var loss_of_taste_if_yes_for_how_long
 var loss_of_smell_if_yes_for_how_long
 var change_in_taste
 var forgetful_or_absent_minded
 var confusion
 var difficulty_concentrating
 var eye_pain
 var eye_redness
 var eye_tearing
 var light_sensitivity
 var floaters
 var loss_of_vision
 var blurry_vision
 var flashes_of_light
 var eye_burning
 var sore_throat
 var runny_nose_or_congestestion
 var sinusitis
 var facial_pressure
 var neck_pain
 var mouth_sores
 var palpitations
 var chest_pain
 var lower_extremity_swelling
 var chest_burning
 var chest_pressure
 var rapid_heart_rate
 var difficulty_breathing_dyspnea
 var cough
 var phlegm_in_back_of_throat
 var wheezing
 var abdominal_pain
 var diarrhea
 var nausea
 var reflux
 var constipation
 var vomiting
 var rash
 var easy_bruising
 var dry_skin
 var itching
 var jaundice
 var muscleor_body_aches_myalgia
 var exercise_intolerance
 var joint_pain
 var weakness
 var back_pain
 var erectile_dysfunction
 var amenorrhea
 var fevers
 var fatigue
 var appetite_loss
 var anxiety
 var depression
 var difficulty_sleeping
 var bleeding
 var clot
 var hair_loss
 var night_sweats
 var Other
 var Other_text
 var Are_you_seeing_a_physician_for_these_symptoms
 var What_medications_are_you_taking_for_these_symptoms
 var Have_you_received_the_vaccine
 var Pfizer1_Moderna2_astrazenaca3_other4
 var date_of_first_vaccine
 var Did_you_receive_the_second_dose
 var date_of_second_vaccine

 
 for(var i = 1; i<data.length-1; i++){
  
   temp = data[i].data
  
   try{
     Record_ID =  temp[0],
     Consent_date = new Date(temp[1]).toISOString().slice(0, 10),
     //console.log(Consent_date,"XXXX1")
     Date_of_Positive_SARSCOV2_PCR = new Date(temp[2]).toISOString().slice(0, 10),
     End_Date= new Date(temp[3]).toISOString().slice(0,10),
     Disease_Severity_Category=  parseInt(temp[4]),
     Age =  parseInt(temp[5]),
     Age_range= parseInt(temp[6]),
     Date_of_Birth= new Date(temp[7]).toISOString().slice(0,10),
     Sex= parseInt(temp[8]),
     Race_or_Ethnicity= temp[9],
     Height_in_mts =  parseFloat(temp[10]),
     Weight_in_kg=   parseFloat(temp[11]),
     BMI =  parseFloat(temp[12]),
     BMI_Range_in_Text=  temp[13],
     Employed =  parseInt(temp[14]),
     Tobacco_Use=  parseInt(temp[15]),
     packs_per_day =  parseFloat(temp[16]),
     number_of_years=  parseInt(temp[17]),
     How_many_other_individuals_are_in_the_participants_household=  parseInt(temp[18]),
     Zipcode =  parseInt(temp[19])
     Date_of_first_collection = new Date(temp[20]).toISOString().slice(0,10),
     Number_of_days_between_PCR_plus_and_first_collection =  parseInt(temp[21]),
     Date_of_second_collection = new  Date(temp[22]).toISOString().slice(0,10),
     Number_of_days_between_PCR_plus_and_second_collection =   parseInt(temp[23]),
     Date_of_third_collection = new Date(temp[24]).toISOString().slice(0,10),
     Number_of_days_between_PCR_plus_and_third_collection=  parseInt(temp[25]),
     Date_of_fourth_collection = new Date(temp[26]).toISOString().slice(0,10),
     Number_of_days_between_PCR_plus_and_fourth_collection =  parseInt(temp[27]),
     Date_of_fifth_collection = new Date(temp[28]).toISOString().slice(0,10),
     Number_of_days_between_PCR_plus_and_fifth_collection =  parseInt(temp[29]),
     Hospitalized =  parseInt(temp[30]),
     Intubation =  parseInt(temp[31]),
     Oxygen_used_at_hospital=  parseFloat(temp[32]),
     If_yes_how_much_oxygen=  parseFloat(temp[33]),
     Diagnosed_with_DVT_or_PE_clot_after_diagnosis = parseInt(temp[34]),
     If_yes_to_VTE_was_it_a_PE_or_DVT=  temp[35],
     If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE =  temp[36],
     Medications_Taking_at_Time_of_COVID19_diagnosis =  temp[37],
     Past_Medical_History =  temp[38],
     Other_Complications =  temp[39],
     convalescent_plasma =  parseInt(temp[40]),
     first_dose_conval_plasma =new Date(temp[41]).toISOString().slice(0,10),
     Initial_COVID_Symptoms =  temp[42],
     visit_count=  parseInt(temp[43]),
     Visit_date= new Date(temp[44]).toISOString().slice(0,10),
     days_post_PCR=  parseInt(temp[45]),
     No_PASC_is_0_PASC_is_1 =  parseInt(temp[46]),
     any_symptoms=  parseInt(temp[47]),
     headache =  parseInt(temp[48]),
     dizziness =  parseInt(temp[49]),
     loss_of_consciousness =  parseInt(temp[50]),
     deafness=  parseInt(temp[51]),
     numbness_in_extremities= parseInt(temp[52]),
     tingling_inextremities =  parseInt(temp[53]),
     burning_sensation_in_extremities=  parseInt(temp[54]),
     loss_of_taste_if_yes_for_how_long=  parseInt(temp[55]),
     loss_of_smell_if_yes_for_how_long=  parseInt(temp[56]),
     change_in_taste =  parseInt(temp[57]),
     forgetful_or_absent_minded =  parseInt(temp[58]),
     confusion =  parseInt(temp[59]),
     difficulty_concentrating =  parseInt(temp[60]),
     eye_pain =  parseInt(temp[61]),
     eye_redness =  parseInt(temp[62]),
     eye_tearing =  parseInt(temp[63]),
     light_sensitivity =  parseInt(temp[64]),
     floaters =  parseInt(temp[65]),
     loss_of_vision =   parseInt(temp[66]),
     blurry_vision =  parseInt(temp[67]),
     flashes_of_light=   parseInt(temp[68]),
     eye_burning =  parseInt(temp[69]),
     sore_throat =  parseInt(temp[70]),
     runny_nose_or_congestestion =  parseInt(temp[71]),
     sinusitis =  parseInt(temp[72]),
     facial_pressure =  parseInt(temp[73]),
     neck_pain =  parseInt(temp[74]),
     mouth_sores =  parseInt(temp[75]),
     palpitations =  parseInt(temp[76]),
     chest_pain =   parseInt(temp[77]),
     lower_extremity_swelling=  parseInt(temp[78]),
     chest_burning =  parseInt(temp[79]),
     chest_pressure =  parseInt(temp[80]),
     rapid_heart_rate =  parseInt(temp[81]),
     difficulty_breathing_dyspnea=  parseInt(temp[82]),
     cough =  parseInt(temp[83]),
     phlegm_in_back_of_throat =  parseInt(temp[84]),
     wheezing=  parseInt(temp[85]),
     abdominal_pain =  parseInt(temp[86]),
     diarrhea =  parseInt(temp[87]),
     nausea =  parseInt(temp[88]),
     reflux =  parseInt(temp[89]),
     constipation =  parseInt(temp[90]),
     vomiting =  parseInt(temp[91]),
     rash =  parseInt(temp[92]),
     easy_bruising= parseInt(temp[93]),
     dry_skin=  parseInt(temp[94]),
     itching =  parseInt(temp[95]),
     jaundice=  parseInt(temp[96]),
     muscleor_body_aches_myalgia =  parseInt(temp[97]),
     exercise_intolerance=  parseInt(temp[98]),
     joint_pain=  parseInt(temp[99]),
     weakness =   parseInt(temp[100]),
     back_pain=   parseInt(temp[101]),
     erectile_dysfunction=  parseInt(temp[102]),
     amenorrhea=  parseInt(temp[103]),
     fevers=  parseInt(temp[104]),
     fatigue=  parseInt(temp[105]),
     appetite_loss=  parseInt(temp[106]),
     anxiety=  parseInt(temp[107]),
     depression=  parseInt(temp[108]),
     difficulty_sleeping=  parseInt(temp[109]),
     bleeding= parseInt(temp[110]),
     clot=  parseInt(temp[111]),
     hair_loss=  parseInt(temp[112]),
     night_sweats =  parseInt(temp[113]),
     Other=  parseInt(temp[114]),
     Other_text =  temp[115],
     Are_you_seeing_a_physician_for_these_symptoms =  temp[116],
     What_medications_are_you_taking_for_these_symptoms =   temp[117],
     Have_you_received_the_vaccine=  parseInt(temp[118]),
     Pfizer1_Moderna2_astrazenaca3_other4 =  parseInt(temp[119]),
     date_of_first_vaccine = new Date(temp[120]).toISOString().slice(0,10),
     Did_you_receive_the_second_dose =   parseInt(temp[121]),
     date_of_second_vaccine = new Date(temp[122]).toISOString().slice(0,10)
      }
    catch{
     // Record_ID = "entering in catch",
     console.log(Sex,"Secc")
     //Disease_Severity_Category = 3
    

  }
 
  
//    ///Assigning values to table1 
 
  addPatient_metadata({
     variables: {
     
   Record_ID:Record_ID,
   Consent_date:Consent_date,
   Date_of_Positive_SARSCOV2_PCR: Date_of_Positive_SARSCOV2_PCR,
   End_Date : End_Date,
   Disease_Severity_Category : Disease_Severity_Category,
   Age: Age,
   Age_range: Age_range,
   Date_of_Birth: Date_of_Birth,
   Sex:Sex,
   Race_or_Ethnicity:Race_or_Ethnicity,
   Height_in_mts: Height_in_mts,
   Weight_in_kg: Weight_in_kg,
   BMI: BMI,
   BMI_Range_in_Text:BMI_Range_in_Text,
   Employed: Employed,
   Tobacco_Use:Tobacco_Use,
   packs_per_day:packs_per_day,
   number_of_years:number_of_years,
   How_many_other_individuals_are_in_the_participants_household: How_many_other_individuals_are_in_the_participants_household,
   Zipcode:Zipcode,
   Date_of_first_collection:Date_of_first_collection,
   Number_of_days_between_PCR_plus_and_first_collection: Number_of_days_between_PCR_plus_and_first_collection,
   Date_of_second_collection:Date_of_second_collection,
   Number_of_days_between_PCR_plus_and_second_collection: Number_of_days_between_PCR_plus_and_second_collection,
   Date_of_third_collection:Date_of_third_collection,
   Number_of_days_between_PCR_plus_and_third_collection:Number_of_days_between_PCR_plus_and_third_collection,
   Date_of_fourth_collection:Date_of_fourth_collection,
   Number_of_days_between_PCR_plus_and_fourth_collection:Number_of_days_between_PCR_plus_and_fourth_collection,
   Date_of_fifth_collection:Date_of_fifth_collection,
   Number_of_days_between_PCR_plus_and_fifth_collection: Number_of_days_between_PCR_plus_and_fifth_collection,
   Hospitalized: Hospitalized,
   Intubation: Intubation,
   Oxygen_used_at_hospital: Oxygen_used_at_hospital,
   If_yes_how_much_oxygen: If_yes_how_much_oxygen,
   Diagnosed_with_DVT_or_PE_clot_after_diagnosis: Diagnosed_with_DVT_or_PE_clot_after_diagnosis,
   If_yes_to_VTE_was_it_a_PE_or_DVT: If_yes_to_VTE_was_it_a_PE_or_DVT,
   If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE: If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE,
   Medications_Taking_at_Time_of_COVID19_diagnosis:Medications_Taking_at_Time_of_COVID19_diagnosis,
   Past_Medical_History: Past_Medical_History,
   Other_Complications: Other_Complications,
   convalescent_plasma:convalescent_plasma,
   first_dose_conval_plasma: first_dose_conval_plasma,
   Initial_COVID_Symptoms:Initial_COVID_Symptoms,
   visit_count:visit_count,
   Visit_date:Visit_date,
   days_post_PCR:days_post_PCR,
   No_PASC_is_0_PASC_is_1:No_PASC_is_0_PASC_is_1,
   any_symptoms:any_symptoms,
   headache:headache,
   dizziness:dizziness,
   loss_of_consciousness:loss_of_consciousness,
   deafness:deafness,
   numbness_in_extremities:numbness_in_extremities,
   tingling_inextremities:tingling_inextremities,
   burning_sensation_in_extremities:burning_sensation_in_extremities,
   loss_of_taste_if_yes_for_how_long: loss_of_taste_if_yes_for_how_long,
   loss_of_smell_if_yes_for_how_long:loss_of_smell_if_yes_for_how_long,
   change_in_taste:change_in_taste,
   forgetful_or_absent_minded:forgetful_or_absent_minded,
   confusion:confusion,
   difficulty_concentrating:difficulty_concentrating,
   eye_pain:eye_pain,
   eye_redness: eye_redness,
   eye_tearing:eye_tearing,
   light_sensitivity:light_sensitivity,
   floaters :floaters,
   loss_of_vision:loss_of_vision ,
   blurry_vision:blurry_vision,
   flashes_of_light: flashes_of_light,
   eye_burning : eye_burning,
   sore_throat:sore_throat,
   runny_nose_or_congestestion:runny_nose_or_congestestion,
   sinusitis:sinusitis,
   facial_pressure:facial_pressure,
   neck_pain:neck_pain,
   mouth_sores: mouth_sores,
   palpitations:palpitations,
   chest_pain :chest_pain,
   lower_extremity_swelling:lower_extremity_swelling,
   chest_burning:chest_burning,
   chest_pressure:chest_pressure,
   rapid_heart_rate:rapid_heart_rate,
   difficulty_breathing_dyspnea:difficulty_breathing_dyspnea,
   cough:cough,
   phlegm_in_back_of_throat:phlegm_in_back_of_throat,
   wheezing :wheezing,
   abdominal_pain:abdominal_pain,
   diarrhea:diarrhea,
   nausea:nausea,
   reflux:reflux,
   constipation:constipation,
   vomiting:vomiting,
   rash:rash,
   easy_bruising:easy_bruising,
   dry_skin:dry_skin,
   itching :itching,
   jaundice:jaundice,
   muscleor_body_aches_myalgia:muscleor_body_aches_myalgia,
   exercise_intolerance:exercise_intolerance,
   joint_pain :joint_pain,
   weakness :weakness,
   back_pain :back_pain,
   erectile_dysfunction:erectile_dysfunction,
   amenorrhea :amenorrhea,
   fevers: fevers,
   fatigue :fatigue,
   appetite_loss:appetite_loss,
   anxiety :anxiety,
   depression: depression,
   difficulty_sleeping:difficulty_sleeping,
   bleeding:bleeding,
   clot: clot,
   hair_loss:hair_loss,
   night_sweats:night_sweats,
   Other :Other,
   Other_text: Other_text,
   Are_you_seeing_a_physician_for_these_symptoms: Are_you_seeing_a_physician_for_these_symptoms,
   What_medications_are_you_taking_for_these_symptoms:What_medications_are_you_taking_for_these_symptoms,
   Have_you_received_the_vaccine:Have_you_received_the_vaccine,
   Pfizer1_Moderna2_astrazenaca3_other4:Pfizer1_Moderna2_astrazenaca3_other4,
   date_of_first_vaccine:date_of_first_vaccine,
   Did_you_receive_the_second_dose:Did_you_receive_the_second_dose,
   date_of_second_vaccine:date_of_second_vaccine
 
     }
   })
  }
}


// declaring variables and parsing for Table2 i.e, Patient_Inventories
   const uploadData2 = (data) =>{
   var record_id;
   var visit_count;
   var Date_of_positive_SARS_COV2_PCR;
   var date_of_first_collection ;
   var number_of_days_betwen_PCR_plus_and_first_collection;
   var platelet_panel_1;
   var platelet_panel_2;
   var platelet_panel_3;
   var whole_blood_panel;
   var PBMC_panel ;
   var plasma ;
   var plasma_tubes;
   var plasma_ul_per_tube;
   var serum;
   var serum_tubes;
   var serum_ul_per_tube ;
   var PBMC_tubes;
   var PBMC_location;
   var cell_count_per_tube ;
   var cell_count_total ;
   var NP_tubes ;
   var NP_storage;
   var NP_PCR_Result;
   var NP_CT_value ;
   var NP_Plaque_Assay_Titer_PFU_per_ml;
   var NP_Plaque_Assay_Ct_Value ;
   var Saliva_sample_No ;
   var saliva_sample_No_VTM_number_of_tubes ;
   var Saliva_Sample_No_VTM_ul_amount_per_tube;
   var Saliva_sample_with_VTM;
   var Saliva_plus_VTM_tubes ;
   var Saliva_plus_VTM_storage_box ;
   var Saliva_PCR_Results;
   var Saliva_CT_value;
   var Saliva_Plaque_Assay_Titer_PFU_per_ml;
   var Saliva_Plaque_Assay_Ct_Value;
   var Stool_Sample ;
   var Stool_Tube_number ;
   var Stool_deidentification_number ;
   var Stool_RNA_PCR ;
   var Stool_RNA_CT_value ;
   var Stool_RNA_ddPCR;
   var Stool_RNA_ddPCR_value;
  
 // $Record_ID:String
 
 for(var i = 1; i<data.length-1; i++){
   try{
    temp = data[i].data
    record_id = temp[0]
    visit_count = parseInt(temp[1])
    Date_of_positive_SARS_COV2_PCR = new Date(temp[2]).toISOString().slice(0, 10)
    date_of_first_collection =  new Date(temp[3]).toISOString().slice(0, 10)
    number_of_days_betwen_PCR_plus_and_first_collection =  parseInt(temp[4])
    platelet_panel_1 = parseInt(temp[5])
    platelet_panel_2 =  parseInt(temp[6])
    platelet_panel_3 = parseInt(temp[7])
    whole_blood_panel =  parseInt(temp[8])
    PBMC_panel =  parseInt(temp[9])
    plasma =  parseInt(temp[10])
    plasma_tubes =  parseInt(temp[11])
    plasma_ul_per_tube =  parseInt(temp[12])
    serum=  parseInt(temp[13])
    serum_tubes =  parseInt(temp[14])
    serum_ul_per_tube =  parseInt(temp[15])
    PBMC_tubes =  parseInt(temp[16])
    PBMC_location = temp[17]
    cell_count_per_tube =  parseInt(temp[18])
    cell_count_total =  parseInt(temp[19])
    NP_tubes =  parseInt(temp[20])
    NP_storage =  parseInt(temp[21])
    NP_PCR_Result =  parseInt(temp[22])
    NP_CT_value =  parseFloat(temp[23])
    NP_Plaque_Assay_Titer_PFU_per_ml =  parseInt(temp[24])
    NP_Plaque_Assay_Ct_Value =  parseFloat(temp[25])
    Saliva_sample_No =  parseInt(temp[26])
    saliva_sample_No_VTM_number_of_tubes =  parseInt(temp[27])
    Saliva_Sample_No_VTM_ul_amount_per_tube =  parseInt(temp[28])
    Saliva_sample_with_VTM =  parseInt(temp[29])
    Saliva_plus_VTM_tubes =  parseInt(temp[30])
    Saliva_plus_VTM_storage_box =  parseInt(temp[31])
    Saliva_PCR_Results =  parseInt(temp[32])
    Saliva_CT_value= parseFloat(temp[33])
    Saliva_Plaque_Assay_Titer_PFU_per_ml =  parseInt(temp[34])
    Saliva_Plaque_Assay_Ct_Value =  parseFloat(temp[35])
    Stool_Sample =  parseInt(temp[36])
    Stool_Tube_number =  parseInt(temp[37])
    Stool_deidentification_number = temp[38]
    Stool_RNA_PCR =  parseInt(temp[39])
    Stool_RNA_CT_value =  parseFloat(temp[40])
    Stool_RNA_ddPCR =  parseInt(temp[41])
    Stool_RNA_ddPCR_value=  parseFloat(temp[42])
  
   }
  catch {
     //record_id = "going in catch block"
     Date_of_positive_SARS_COV2_PCR= null
     date_of_first_collection = null
     

    
   }
 
//// Assigning values to variables Table2
 addPatient_Inventories({

   variables: {
    record_id : record_id ,
    visit_count : visit_count,
     Date_of_positive_SARS_COV2_PCR : Date_of_positive_SARS_COV2_PCR,
     date_of_first_collection : date_of_first_collection,
     number_of_days_betwen_PCR_plus_and_first_collection : number_of_days_betwen_PCR_plus_and_first_collection,
    platelet_panel_1  : platelet_panel_1,
    platelet_panel_2 : platelet_panel_2,
    platelet_panel_3 :platelet_panel_3,
    whole_blood_panel: whole_blood_panel,Date_of_positive_SARS_COV2_PCR,
    PBMC_panel :PBMC_panel,
    plasma : plasma,
    plasma_tubes :plasma_tubes,
    plasma_ul_per_tube : plasma_ul_per_tube,
    serum :serum,
    serum_tubes :serum_tubes,
    serum_ul_per_tube : serum_ul_per_tube,
    PBMC_tubes:PBMC_tubes,
    PBMC_location :PBMC_location,
    cell_count_per_tube : cell_count_per_tube,
    cell_count_total :cell_count_total,
    NP_tubes :NP_tubes,
    NP_storage :NP_storage,
    NP_PCR_Result :NP_PCR_Result,
    NP_CT_value :NP_CT_value,
    NP_Plaque_Assay_Titer_PFU_per_ml : NP_Plaque_Assay_Titer_PFU_per_ml,
    NP_Plaque_Assay_Ct_Value :NP_Plaque_Assay_Ct_Value,
    Saliva_sample_No :Saliva_sample_No,
    saliva_sample_No_VTM_number_of_tubes :saliva_sample_No_VTM_number_of_tubes,
    Saliva_Sample_No_VTM_ul_amount_per_tube : Saliva_Sample_No_VTM_ul_amount_per_tube,
    Saliva_sample_with_VTM : Saliva_sample_with_VTM,
    Saliva_plus_VTM_tubes  : Saliva_plus_VTM_tubes,
    Saliva_plus_VTM_storage_box : Saliva_plus_VTM_storage_box,
    Saliva_PCR_Results : Saliva_PCR_Results,
    Saliva_CT_value : Saliva_CT_value,
    Saliva_Plaque_Assay_Titer_PFU_per_ml :  Saliva_Plaque_Assay_Titer_PFU_per_ml,
    Saliva_Plaque_Assay_Ct_Value : Saliva_Plaque_Assay_Ct_Value,
    Stool_Sample :Stool_Sample,
    Stool_Tube_number : Stool_Tube_number,
    Stool_deidentification_number : Stool_deidentification_number,
    Stool_RNA_PCR : Stool_RNA_PCR,
    Stool_RNA_CT_value :Stool_RNA_CT_value,
    Stool_RNA_ddPCR : Stool_RNA_ddPCR,
    Stool_RNA_ddPCR_value : Stool_RNA_ddPCR_value
    
   }
 
 });
}
   };

 
//variables declaring and parsing values to table3 i.e, Uninfected_metadata
 

 
 const uploadData3 = (data) =>{
   var Record_ID;
   var Disease_severity_category;
   var Age;
   var Age_range;
   var Date_of_Birth;
   var Sex;
   var Race_or_Ethnicity;
   var Height;
   var Weight_in_kg;
   var BMI;
   var BMI_range;
   var Date_of_positive_SARS_COV2_PCR;
   var Date_of_first_collection;
   var Past_medical_history;
   var Employed;
   var Tobacco_use;
   var packs_per_day;
   var number_of_years;
   var number_of_other_individuals_in_participant_household;
   var Zipcode;
   var Comments;
  
 
 for(var i = 1; i<data.length-1; i++){
   temp = data[i].data
   // var pcr_plus_date = new Date(temp[2]).toISOString().slice(0, 10)?
   try{
    
   Record_ID = temp[0],
    Disease_severity_category = temp[1],
    Age =  parseInt(temp[2]),
   Date_of_Birth =  new Date(temp[3]).toISOString().slice(0, 10) ,
   Sex =  parseInt(temp[4]),
   Race_or_Ethnicity = temp[5],
   Height =  parseFloat(temp[6]),
   Weight_in_kg =  parseFloat(temp[7]),
   BMI = parseFloat(temp[8]),
   BMI_range = temp[9],
    Date_of_positive_SARS_COV2_PCR =  new Date(temp[10]).toISOString().slice(0, 10),
    Date_of_first_collection = new Date(temp[11]).toISOString().slice(0, 10),
   Past_medical_history = temp[12],
   Employed =  parseInt(temp[13]),
   Tobacco_use = parseInt(temp[14]),
   packs_per_day =  parseFloat(temp[15]),
   number_of_years =  parseInt(temp[16]),
   number_of_other_individuals_in_participant_household =  parseInt(temp[17]),
   Zipcode =  parseInt(temp[18]),
   Comments = temp[19],
   Age_range =  parseInt(temp[20])
 
   }
   catch{
 
     //Record_ID= "Enteringcatchblock" 
   Date_of_positive_SARS_COV2_PCR = null
   Date_of_first_collection = null
   Date_of_Birth = null
   }
 

 
///////// Assigning values to table3
 
 addUninfected_metadata({
   variables: {
 
   Record_ID :Record_ID,
   Disease_severity_category :Disease_severity_category,
   Age  :Age,
   Date_of_Birth :Date_of_Birth,
   Sex : Sex,
   Race_or_Ethnicity :Race_or_Ethnicity,
   Height :Height,
   Weight_in_kg : Weight_in_kg,
   BMI :BMI,
   BMI_range :BMI_range,
   Date_of_positive_SARS_COV2_PCR: Date_of_positive_SARS_COV2_PCR,
   Date_of_first_collection: Date_of_first_collection,
   Past_medical_history: Past_medical_history,
   Employed :Employed,
   Tobacco_use :Tobacco_use,
   packs_per_day :packs_per_day,
   number_of_years :number_of_years,
   number_of_other_individuals_in_participant_household: number_of_other_individuals_in_participant_household,
   Zipcode :Zipcode,
   Comments: Comments,
   Age_range: Age_range
    }
 } )
}
 }


 

///////// Variables Declaring and Parsing table4

const uploadData4 = (data) =>{
 
   var Record_ID;
   var visit_count;
   var Date_of_Positive_SARS_COV2_PCR ;
   var Date_of_first_collection ;
   var number_of_days_between_PCR_plus_and_first_collection;
   var platelet_panel_1;
   var platelet_panel_2;
   var platelet_panel_3;
   var whole_blood_panel;
   var PBMC_panel;
   var Plasma ;
   var Plasma_tubes;
   var plasma_ul_per_tube;
   var Serum;
   var Serum_tubes;
   var Serum_ul_per_tube;
   var PBMC_tubes;
   var PBMC_location;
   var Cell_count_per_tube;
   var Cell_count_total;
   var NP_tubes;
   var NP_storage_box;
   var NP_PCR_Result;
   var NP_CT_value;
   var NP_Plaque_Assay_Titer_PFU_per_ml;
   var NP_Plaque_Assay_Ct_Value;
   var Saliva_Sample_No_VTM
   var Saliva_Sample_No_VTM_number_of_tubes;
   var Saliva_sample_No_VTM_ul_amount_per_tube;
   var Saliva_Sample_with_VTM;
   var Saliva_plus_VTM_tubes;
   var Saliva_plus_VTM_Storage_box;
   var Saliva_PCR_results;
   var Saliva_CT_value;
   var Saliva_Plaque_Assay_Titer_PFU_per_ml;
   var Saliva_Plaque_Assay_Ct_value;
   var Stool_Sample;
   var Stool_Tube_number;
   var Stool_deidentification_number;
   var Stool_RNA_PCR;
   var stool_RNA_CT_value;
   var Stool_RNA_ddPCR;
   var Stool_RNA_ddPCR_value;

  
for(var i = 1; i<data.length-1; i++){
 temp = data[i].data
 //console.log(temp[0],"fa")
 try{
   Record_ID = temp[0],
   visit_count =  parseInt(temp[1]),
   Date_of_Positive_SARS_COV2_PCR = new Date(temp[2]).toISOString().slice(0, 10),
   Date_of_first_collection = new Date(temp[3]).toISOString().slice(0, 10),
   number_of_days_between_PCR_plus_and_first_collection =  parseInt(temp[4]),
   platelet_panel_1 =  parseInt(temp[5]),
   platelet_panel_2 =  parseInt(temp[6]),
   platelet_panel_3 =  parseInt(temp[7]),
   whole_blood_panel=  parseInt(temp[8]),
   PBMC_panel= parseInt(temp[9]),
   Plasma = parseInt(temp[10]),
   Plasma_tubes =  parseInt(temp[11]),
   plasma_ul_per_tube =  parseInt(temp[12]),
   Serum =  parseInt(temp[13]),
   Serum_tubes =  parseInt(temp[14]),
   Serum_ul_per_tube =  parseInt(temp[15]),
   PBMC_tubes =  parseInt(temp[16]),
   PBMC_location = temp[17],
   Cell_count_per_tube =  parseInt(temp[18]),
   Cell_count_total =  parseInt(temp[19]),
   NP_tubes =  parseInt(temp[20]),
   NP_storage_box =  parseInt(temp[21]),
   NP_PCR_Result =  parseInt(temp[22]),
   NP_CT_value =  parseFloat(temp[23]),
   NP_Plaque_Assay_Titer_PFU_per_ml= parseFloat(temp[24]),
   NP_Plaque_Assay_Ct_Value =  parseFloat(temp[25]),
   Saliva_Sample_No_VTM =  parseInt(temp[26]),
   Saliva_Sample_No_VTM_number_of_tubes =  parseInt(temp[27]),
   Saliva_sample_No_VTM_ul_amount_per_tube =  parseInt(temp[28]),
   Saliva_Sample_with_VTM =  parseInt(temp[29]),
   Saliva_plus_VTM_tubes =  parseInt(temp[30]),
   Saliva_plus_VTM_Storage_box =  parseInt(temp[31]),
   Saliva_PCR_results =  parseInt(temp[32]),
   Saliva_CT_value =  parseFloat(temp[33]),
   Saliva_Plaque_Assay_Titer_PFU_per_ml =  parseInt(temp[34]),
   Saliva_Plaque_Assay_Ct_value =  parseFloat(temp[35]),
   Stool_Sample =  parseFloat(temp[36]),
   Stool_Tube_number =  parseFloat(temp[37]),
   Stool_deidentification_number = temp[38],
   Stool_RNA_PCR =  parseFloat(temp[39]),
   stool_RNA_CT_value =  parseFloat(temp[40]),
   Stool_RNA_ddPCR =  parseInt(temp[41]),
   Stool_RNA_ddPCR_value =  parseFloat(temp[42])
 }
 catch{
  //Record_ID = "Enteringcatchblock",
  Date_of_Positive_SARS_COV2_PCR = null,
  Date_of_first_collection = null

 }

 
///assigning values for table4
 
 addUninfected_Inventory({
   variables: {
   Record_ID : Record_ID,
    visit_count : visit_count,
   Date_of_Positive_SARS_COV2_PCR : Date_of_Positive_SARS_COV2_PCR,
   Date_of_first_collection : Date_of_first_collection,
   number_of_days_between_PCR_plus_and_first_collection :number_of_days_between_PCR_plus_and_first_collection,
   platelet_panel_1 : platelet_panel_1,
   platelet_panel_2 : platelet_panel_2,
   platelet_panel_3 : platelet_panel_3,
   whole_blood_panel : whole_blood_panel,
   PBMC_panel : PBMC_panel,
   Plasma : Plasma,
   Plasma_tubes :Plasma_tubes,
   plasma_ul_per_tube : plasma_ul_per_tube,
   Serum : Serum,
   Serum_tubes : Serum_tubes,
   Serum_ul_per_tube : Serum_ul_per_tube,
   PBMC_tubes : PBMC_tubes,
   PBMC_location : PBMC_location,
   Cell_count_per_tube : Cell_count_per_tube,
   Cell_count_total : Cell_count_total,
   NP_tubes : NP_tubes,
   NP_storage_box : NP_storage_box,
   NP_PCR_Result : NP_PCR_Result,
   NP_CT_value : NP_CT_value,
   NP_Plaque_Assay_Titer_PFU_per_ml : NP_Plaque_Assay_Titer_PFU_per_ml,
   NP_Plaque_Assay_Ct_Value : NP_Plaque_Assay_Ct_Value,
   Saliva_Sample_No_VTM : Saliva_Sample_No_VTM,
   Saliva_Sample_No_VTM_number_of_tubes : Saliva_Sample_No_VTM_number_of_tubes,
   Saliva_sample_No_VTM_ul_amount_per_tube : Saliva_sample_No_VTM_ul_amount_per_tube,
   Saliva_Sample_with_VTM : Saliva_Sample_with_VTM,
   Saliva_plus_VTM_tubes : Saliva_plus_VTM_tubes,
   Saliva_plus_VTM_Storage_box : Saliva_plus_VTM_Storage_box,
   Saliva_PCR_results : Saliva_PCR_results,
   Saliva_CT_value : Saliva_CT_value,
   Saliva_Plaque_Assay_Titer_PFU_per_ml : Saliva_Plaque_Assay_Titer_PFU_per_ml,
   Saliva_Plaque_Assay_Ct_value : Saliva_Plaque_Assay_Ct_value,
   Stool_Sample : Stool_Sample,
   Stool_Tube_number : Stool_Tube_number,
   Stool_deidentification_number : Stool_deidentification_number,
   Stool_RNA_PCR : Stool_RNA_PCR,
   stool_RNA_CT_value : stool_RNA_CT_value,
   Stool_RNA_ddPCR : Stool_RNA_ddPCR,
   Stool_RNA_ddPCR_value : Stool_RNA_ddPCR_value
 
   }
 })
}
}




/// ####### No need to change below Components #####

const handleOnError = (err, file, inputElem, reason) => {
   console.log('---------------------------');
   console.log(err);
   console.log('---------------------------');
 };
 
 const handleOnRemoveFile = (data2) => {
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
 



 //// ##### No need to change below return and style #####
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
