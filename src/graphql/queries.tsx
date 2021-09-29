import { gql } from "@apollo/client";
export const GetUserDetails = gql`
  query ($userID: String) {
    appUsers(where: { uid: $userID }) {
      id
      name
      userType
      password
    }
  }
`;

export const GetDetailsWithEmployeeId = gql`
  query ($employeeid: String) {
    appUsers(
      where: { uid: $employeeid }
    ) {
      id
      name
      userType
      password
    }
  }
`;


///Table1 uploading.........

export const UploadPatient_metadata = gql`
mutation(
      $Record_ID:String
      $Consent_date:Date
      $Date_of_Positive_SARSCOV2_PCR: Date
      $End_Date : Date
      $Disease_Severity_Category : Int
      $Age: Int
      $Age_range: Int
      $Date_of_Birth: Date
      $Sex:Int
      $Race_or_Ethnicity:String
      $Height_in_mts: Float
      $Weight_in_kg: Float
      $BMI: Float
      $BMI_Range_in_Text:String
      $Employed: Int
      $Tobacco_Use:Int
      $packs_per_day:Float
      $number_of_years:Int 
      $How_many_other_individuals_are_in_the_participants_household: Int
      $Zipcode:Int
      $Date_of_first_collection:Date
     $Number_of_days_between_PCR_plus_and_first_collection: Int
     $Date_of_second_collection:Date
     $Number_of_days_between_PCR_plus_and_second_collection: Int
     $Date_of_third_collection:Date
     $Number_of_days_between_PCR_plus_and_third_collection:Int
     $Date_of_fourth_collection:Date
     $Number_of_days_between_PCR_plus_and_fourth_collection:Int
     $Date_of_fifth_collection:Date
     $Number_of_days_between_PCR_plus_and_fifth_collection: Int
     $Hospitalized: Int
     $Intubation: Int
     $Oxygen_used_at_hospital: Float
     $If_yes_how_much_oxygen: Float
     $Diagnosed_with_DVT_or_PE_clot_after_diagnosis: Int
     $If_yes_to_VTE_was_it_a_PE_or_DVT: String
     $If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE: String
     $Medications_Taking_at_Time_of_COVID19_diagnosis:String
     $Past_Medical_History: String
     $Other_Complications: String
     $convalescent_plasma:Int
     $first_dose_conval_plasma: Date
     $Initial_COVID_Symptoms:String
     $visit_count:Int
     $Visit_date:Date
     $days_post_PCR:Int
     $No_PASC_is_0_PASC_is_1:Int
     $any_symptoms:Int
     $headache:Int
     $dizziness:Int
     $loss_of_consciousness:Int
     $deafness:Int
     $numbness_in_extremities:Int
     $tingling_inextremities:Int
     $burning_sensation_in_extremities:Int
     $loss_of_taste_if_yes_for_how_long: Int
     $loss_of_smell_if_yes_for_how_long:Int
     $change_in_taste:Int
     $forgetful_or_absent_minded:Int
     $confusion:Int
     $difficulty_concentrating:Int
     $eye_pain:Int
     $eye_redness: Int
     $eye_tearing:Int
     $light_sensitivity:Int
     $floaters :Int
     $loss_of_vision:Int
     $blurry_vision:Int
     $flashes_of_light: Int
     $eye_burning : Int
     $sore_throat:Int
     $runny_nose_or_congestestion:Int
     $sinusitis:Int
     $facial_pressure:Int
     $neck_pain:Int
     $mouth_sores: Int
     $palpitations:Int
     $chest_pain :Int
     $lower_extremity_swelling:Int
     $chest_burning:Int
     $chest_pressure:Int
     $rapid_heart_rate:Int
     $difficulty_breathing_dyspnea:Int
     $cough:Int
     $phlegm_in_back_of_throat:Int
     $wheezing :Int
     $abdominal_pain:Int
     $diarrhea:Int
     $nausea:Int
     $reflux:Int
     $constipation:Int
     $vomiting:Int
     $rash:Int
     $easy_bruising:Int
     $dry_skin:Int
     $itching :Int
     $jaundice:Int
     $muscleor_body_aches_myalgia:Int
     $exercise_intolerance:Int
     $joint_pain :Int
     $weakness :Int
     $back_pain :Int
     $erectile_dysfunction:Int
     $amenorrhea :Int
     $fevers : Int
     $fatigue :Int
     $appetite_loss:Int
     $anxiety :Int
     $depression: Int
     $difficulty_sleeping:Int
     $bleeding:Int
     $clot: Int
     $hair_loss:Int
     $night_sweats:Int
     $Other :Int
     $Other_text: String
     $Are_you_seeing_a_physician_for_these_symptoms: String
     $What_medications_are_you_taking_for_these_symptoms:String
     $Have_you_received_the_vaccine:Int
     $Pfizer1_Moderna2_astrazenaca3_other4:Int
     $date_of_first_vaccine:Date
     $Did_you_receive_the_second_dose:Int
     $date_of_second_vaccine:Date

      
      
 
){
  createPatientMetadatum(input:{data:{
    Record_ID:$Record_ID,
    Consent_date:$Consent_date,
    Date_of_Positive_SARSCOV2_PCR: $Date_of_Positive_SARSCOV2_PCR,
    End_Date : $End_Date,
    Disease_Severity_Category:$Disease_Severity_Category, 
    Age:$Age,
    Age_range:$Age_range,
    Date_of_Birth:$Date_of_Birth, 
    Sex: $Sex,
    Race_or_Ethnicity:$Race_or_Ethnicity,
    Height_in_mts:$Height_in_mts,
    Weight_in_kg:$Weight_in_kg,
    BMI:$BMI,
    BMI_Range_in_Text:$BMI_Range_in_Text,
    Employed:$Employed,
    Tobacco_Use:$Tobacco_Use, 
    packs_per_day:$packs_per_day, 
    number_of_years:$number_of_years, 
    How_many_other_individuals_are_in_the_participants_household:$How_many_other_individuals_are_in_the_participants_household,
    Zipcode:$Zipcode,
    Date_of_first_collection:$Date_of_first_collection,
   Number_of_days_between_PCR_plus_and_first_collection:$Number_of_days_between_PCR_plus_and_first_collection,
   Date_of_second_collection:$Date_of_second_collection,
   Number_of_days_between_PCR_plus_and_second_collection:$Number_of_days_between_PCR_plus_and_second_collection,
   Date_of_third_collection:$Date_of_third_collection,
   Number_of_days_between_PCR_plus_and_third_collection:$Number_of_days_between_PCR_plus_and_third_collection,
   Date_of_fourth_collection:$Date_of_fourth_collection,
   Number_of_days_between_PCR_plus_and_fourth_collection:$Number_of_days_between_PCR_plus_and_fourth_collection,
   Date_of_fifth_collection:$Date_of_fifth_collection,
   Number_of_days_between_PCR_plus_and_fifth_collection:$Number_of_days_between_PCR_plus_and_fifth_collection,
   Hospitalized:$Hospitalized,
   Intubation:$Intubation,
   Oxygen_used_at_hospital:$Oxygen_used_at_hospital,
   If_yes_how_much_oxygen: $If_yes_how_much_oxygen,
   Diagnosed_with_DVT_or_PE_clot_after_diagnosis:$Diagnosed_with_DVT_or_PE_clot_after_diagnosis,
   If_yes_to_VTE_was_it_a_PE_or_DVT:$If_yes_to_VTE_was_it_a_PE_or_DVT,
   If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE:$If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE,
   Medications_Taking_at_Time_of_COVID19_diagnosis:$Medications_Taking_at_Time_of_COVID19_diagnosis,
   Past_Medical_History: $Past_Medical_History,
   Other_Complications:$Other_Complications,
   convalescent_plasma:$convalescent_plasma,
   first_dose_conval_plasma:$first_dose_conval_plasma,
   Initial_COVID_Symptoms:$Initial_COVID_Symptoms,
   visit_count:$visit_count,
   Visit_date:$Visit_date,
   days_post_PCR:$days_post_PCR,
   No_PASC_is_0_PASC_is_1:$No_PASC_is_0_PASC_is_1,
   any_symptoms:$any_symptoms,
   headache: $headache,
   dizziness:$dizziness,
   loss_of_consciousness: $loss_of_consciousness,
   deafness:$deafness,
   numbness_in_extremities:$numbness_in_extremities,
   tingling_inextremities:$tingling_inextremities,
   burning_sensation_in_extremities:$burning_sensation_in_extremities,
   loss_of_taste_if_yes_for_how_long:$loss_of_taste_if_yes_for_how_long,
   loss_of_smell_if_yes_for_how_long:$loss_of_smell_if_yes_for_how_long,
   change_in_taste:$change_in_taste,
   forgetful_or_absent_minded:$forgetful_or_absent_minded,
   confusion:$confusion,
   difficulty_concentrating:$difficulty_concentrating,
   eye_pain:$eye_pain,
   eye_redness:$eye_redness,
   eye_tearing:$eye_tearing,
   light_sensitivity:$light_sensitivity,
   floaters:$floaters,
   loss_of_vision:$loss_of_vision,
   blurry_vision:$blurry_vision,
   flashes_of_light:$flashes_of_light,
   eye_burning:$eye_burning,
   sore_throat:$sore_throat,
   runny_nose_or_congestestion:$runny_nose_or_congestestion,
   sinusitis:$sinusitis,
   facial_pressure:$facial_pressure,
   neck_pain:$neck_pain,
   mouth_sores:$mouth_sores,
   palpitations:$palpitations,
   chest_pain:$chest_pain,
   lower_extremity_swelling:$lower_extremity_swelling,
   chest_burning:$chest_burning,
   chest_pressure:$chest_pressure,
   rapid_heart_rate:$rapid_heart_rate,
   difficulty_breathing_dyspnea:$difficulty_breathing_dyspnea,
   cough:$cough,
   phlegm_in_back_of_throat:$phlegm_in_back_of_throat,
   wheezing:$wheezing,
   abdominal_pain:$abdominal_pain,
   diarrhea:$diarrhea,
   nausea: $nausea,
   reflux:$reflux,
   constipation:$constipation,
   vomiting:$vomiting,
   rash:$rash,
   easy_bruising:$easy_bruising,
   dry_skin:$dry_skin,
   itching:$itching,
   jaundice:$jaundice,
   muscleor_body_aches_myalgia:$muscleor_body_aches_myalgia,
   exercise_intolerance:$exercise_intolerance,
   joint_pain:$joint_pain,
   weakness:$weakness,
   back_pain:$back_pain,
   erectile_dysfunction:$erectile_dysfunction,
   amenorrhea:$amenorrhea,
   fevers: $fevers,
   fatigue:$fatigue,
   appetite_loss:$appetite_loss,
   anxiety:$anxiety,
   depression:$depression,
   difficulty_sleeping:$difficulty_sleeping,
   bleeding:$bleeding,
   clot:$clot,
   hair_loss:$hair_loss,
   night_sweats:$night_sweats,
   Other:$Other,
   Other_text:$Other_text,
   Are_you_seeing_a_physician_for_these_symptoms: $Are_you_seeing_a_physician_for_these_symptoms,
   What_medications_are_you_taking_for_these_symptoms:$What_medications_are_you_taking_for_these_symptoms,
   Have_you_received_the_vaccine: $Have_you_received_the_vaccine,
   Pfizer1_Moderna2_astrazenaca3_other4: $Pfizer1_Moderna2_astrazenaca3_other4,
   date_of_first_vaccine: $date_of_first_vaccine,
   Did_you_receive_the_second_dose:$Did_you_receive_the_second_dose,
   date_of_second_vaccine: $date_of_second_vaccine


    
    
    
  }}){
      patientMetadatum{

      Record_ID
    } 
  }   
}
`;

////Table2 uploading .........
export const UploadPatient_Inventories = gql`
mutation(


  $record_id:String
  $visit_count : Int
  $Date_of_positive_SARS_COV2_PCR : Date
  $date_of_first_collection : Date
  $number_of_days_betwen_PCR_plus_and_first_collection : Int
  $platelet_panel_1 : Int
  $platelet_panel_2 : Int
  $platelet_panel_3 : Int
  $whole_blood_panel : Int
  $PBMC_panel : Int
  $plasma : Int
  $plasma_tubes : Int
  $plasma_ul_per_tube : Int
  $serum : Int
  $serum_tubes : Int
  $serum_ul_per_tube : Int
  $PBMC_tubes : Int
  $PBMC_location : String
  $cell_count_per_tube : Long
  $cell_count_total : Long
  $NP_tubes : Int
  $NP_storage : Int
  $NP_PCR_Result: Int
  $NP_CT_value : Float
  $NP_Plaque_Assay_Titer_PFU_per_ml: Int
  $NP_Plaque_Assay_Ct_Value : Float
  $Saliva_sample_No : Int
  $saliva_sample_No_VTM_number_of_tubes : Int
  $Saliva_Sample_No_VTM_ul_amount_per_tube: Int
  $Saliva_sample_with_VTM: Int
  $Saliva_plus_VTM_tubes : Int
  $Saliva_plus_VTM_storage_box :Int
  $Saliva_PCR_Results: Int
  $Saliva_CT_value: Float
  $Saliva_Plaque_Assay_Titer_PFU_per_ml: Long
  $Saliva_Plaque_Assay_Ct_Value : Float
  $Stool_Sample : Int
  $Stool_Tube_number : Int  
  $Stool_deidentification_number : String
  $Stool_RNA_PCR : Int
  $Stool_RNA_CT_value : Float
  $Stool_RNA_ddPCR : Int
  $Stool_RNA_ddPCR_value : Float


  


  
)
{
  createPatientInventory(input:{data:{

    record_id:$record_id,
    visit_count:$visit_count,
    Date_of_positive_SARS_COV2_PCR :$Date_of_positive_SARS_COV2_PCR,
    date_of_first_collection:$date_of_first_collection ,
    number_of_days_betwen_PCR_plus_and_first_collection: $number_of_days_betwen_PCR_plus_and_first_collection,
    platelet_panel_1:$platelet_panel_1 ,
    platelet_panel_2:$platelet_panel_2 ,
    platelet_panel_3:$platelet_panel_3 ,
    whole_blood_panel:$whole_blood_panel ,
    PBMC_panel:$PBMC_panel ,
    plasma:$plasma ,
    plasma_tubes:$plasma_tubes ,
    plasma_ul_per_tube:$plasma_ul_per_tube ,
    serum:$serum ,
    serum_tubes:$serum_tubes ,
    serum_ul_per_tube:$serum_ul_per_tube ,
    PBMC_tubes:$PBMC_tubes ,
    PBMC_location:$PBMC_location,
    cell_count_per_tube:$cell_count_per_tube ,
    cell_count_total:$cell_count_total,
    NP_tubes:$NP_tubes ,
    NP_storage:$NP_storage ,
    NP_PCR_Result:$NP_PCR_Result,
    NP_CT_value:$NP_CT_value,
    NP_Plaque_Assay_Titer_PFU_per_ml:$NP_Plaque_Assay_Titer_PFU_per_ml,
    NP_Plaque_Assay_Ct_Value:$NP_Plaque_Assay_Ct_Value ,
    Saliva_sample_No:$Saliva_sample_No ,
    saliva_sample_No_VTM_number_of_tubes : $saliva_sample_No_VTM_number_of_tubes ,
    Saliva_Sample_No_VTM_ul_amount_per_tube :$Saliva_Sample_No_VTM_ul_amount_per_tube,
    Saliva_sample_with_VTM :$Saliva_sample_with_VTM,
    Saliva_plus_VTM_tubes :$Saliva_plus_VTM_tubes ,
    Saliva_plus_VTM_storage_box :$Saliva_plus_VTM_storage_box ,
    Saliva_PCR_Results :$Saliva_PCR_Results,
    Saliva_CT_value :$Saliva_CT_value,
    Saliva_Plaque_Assay_Titer_PFU_per_ml :$Saliva_Plaque_Assay_Titer_PFU_per_ml,
    Saliva_Plaque_Assay_Ct_Value :$Saliva_Plaque_Assay_Ct_Value,
    Stool_Sample :$Stool_Sample ,
    Stool_Tube_number :$Stool_Tube_number ,
    Stool_deidentification_number :$Stool_deidentification_number ,
    Stool_RNA_PCR :$Stool_RNA_PCR ,
    Stool_RNA_CT_value :$Stool_RNA_CT_value, 
    Stool_RNA_ddPCR :$Stool_RNA_ddPCR,
    Stool_RNA_ddPCR_value :$Stool_RNA_ddPCR_value


    
    }
  }
  )
  {
    patientInventory{
    record_id
  }
  }
  
}`;

////Table 3 Uploading...
export const UploadUninfected_Metadata = gql`
mutation(
  
  $Record_ID : String
  $Disease_severity_category : String
  $Age : Int
  $Date_of_Birth : Date
  $Sex : Int
  $Race_or_Ethnicity : String
  $Height : Float
  $Weight_in_kg : Float
  $BMI : Float
  $BMI_range : String
  $Date_of_positive_SARS_COV2_PCR : Date
  $Date_of_first_collection : Date
  $Past_medical_history : String
  $Employed : Int
  $Tobacco_use : Int
  $packs_per_day : Float
  $number_of_years : Int
  $number_of_other_individuals_in_participant_household : Int
  $Zipcode : Int
  $Comments : String
  $Age_range :Int

  ){
    createUninfectedMetadatum(
      input:{data:{
        Record_ID:$Record_ID,
        Disease_severity_category : $Disease_severity_category,
        Age : $Age,
        Date_of_Birth: $Date_of_Birth,
        Sex : $Sex,
        Race_or_Ethnicity : $Race_or_Ethnicity,
        Height : $Height,
        Weight_in_kg :$Weight_in_kg,
        BMI : $BMI,
        BMI_range :$BMI_range,
        Date_of_positive_SARS_COV2_PCR :$Date_of_positive_SARS_COV2_PCR,
        Date_of_first_collection :$Date_of_first_collection,
        Past_medical_history :$Past_medical_history,
        Employed :$Employed,
        Tobacco_use:$Tobacco_use,
        packs_per_day:$packs_per_day,
        number_of_years:$number_of_years,
        number_of_other_individuals_in_participant_household:$number_of_other_individuals_in_participant_household,
        Zipcode:$Zipcode,
        Comments :$Comments,
        Age_range : $Age_range

      }}){
        uninfectedMetadatum{
        Record_ID
      }}}`;

  //// Table4 uploading .....

export const UploadUninfected_Inventory = gql`
mutation(
  $Record_ID : String
  $visit_count : Int
  $Date_of_Positive_SARS_COV2_PCR : Date
  $Date_of_first_collection :Date
  $number_of_days_between_PCR_plus_and_first_collection :Int
  $platelet_panel_1 : Int
  $platelet_panel_2 : Int
  $platelet_panel_3 : Int
  $whole_blood_panel : Int
  $PBMC_panel : Int
  $Plasma : Int
  $Plasma_tubes : Int
  $plasma_ul_per_tube : Int
  $Serum : Int
  $Serum_tubes :Int 
  $Serum_ul_per_tube:Int
  $PBMC_tubes : Int
  $PBMC_location : String
  $Cell_count_per_tube : Long
  $Cell_count_total : Long
  $NP_tubes : Int 
  $NP_storage_box : Int
  $NP_PCR_Result : Int 
  $NP_CT_value : Float
  $NP_Plaque_Assay_Titer_PFU_per_ml : Float
  $NP_Plaque_Assay_Ct_Value : Float
  $Saliva_Sample_No_VTM : Int
  $Saliva_Sample_No_VTM_number_of_tubes : Int
  $Saliva_sample_No_VTM_ul_amount_per_tube : Int 
  $Saliva_Sample_with_VTM :Int
  $Saliva_plus_VTM_tubes: Int
  $Saliva_plus_VTM_Storage_box : Int
  $Saliva_PCR_results : Int
  $Saliva_CT_value : Float
  $Saliva_Plaque_Assay_Titer_PFU_per_ml : Float
  $Saliva_Plaque_Assay_Ct_value : Float
  $Stool_Sample : Float
  $Stool_Tube_number : Float
  $Stool_deidentification_number : String                              
  $Stool_RNA_PCR : Float
  $stool_RNA_CT_value : Float
  $Stool_RNA_ddPCR : Int
  $Stool_RNA_ddPCR_value : Float

  ){
    createUninfectedInventory(input:{data:{  
  	
    Record_ID : $Record_ID,
    visit_count : $visit_count,
    Date_of_Positive_SARS_COV2_PCR : $Date_of_Positive_SARS_COV2_PCR,
		Date_of_first_collection : $Date_of_first_collection,
    number_of_days_between_PCR_plus_and_first_collection : $number_of_days_between_PCR_plus_and_first_collection,
		platelet_panel_1 : $platelet_panel_1,
    platelet_panel_2 : $platelet_panel_2,
    platelet_panel_3 : $platelet_panel_3,
    whole_blood_panel :$whole_blood_panel,
    PBMC_panel :$PBMC_panel,
		Plasma :$Plasma,
    Plasma_tubes :$Plasma_tubes,
    plasma_ul_per_tube:$plasma_ul_per_tube,
    Serum :$Serum,
    Serum_tubes :$Serum_tubes,
    Serum_ul_per_tube :$Serum_ul_per_tube,
		PBMC_tubes : $PBMC_tubes,
    PBMC_location : $PBMC_location,
    Cell_count_per_tube : $Cell_count_per_tube,
    Cell_count_total :$Cell_count_total, 
    NP_tubes :$NP_tubes, 
    NP_storage_box :$NP_storage_box,
		NP_PCR_Result :$NP_PCR_Result,
    NP_CT_value :$NP_CT_value,
    NP_Plaque_Assay_Titer_PFU_per_ml :$NP_Plaque_Assay_Titer_PFU_per_ml,
    NP_Plaque_Assay_Ct_Value :$NP_Plaque_Assay_Ct_Value,
    Saliva_Sample_No_VTM :$Saliva_Sample_No_VTM ,
		Saliva_Sample_No_VTM_number_of_tubes :$Saliva_Sample_No_VTM_number_of_tubes,
    Saliva_sample_No_VTM_ul_amount_per_tube :$Saliva_sample_No_VTM_ul_amount_per_tube,
    Saliva_Sample_with_VTM :$Saliva_Sample_with_VTM,
    Saliva_plus_VTM_tubes :$Saliva_plus_VTM_tubes,
		Saliva_plus_VTM_Storage_box :$Saliva_plus_VTM_Storage_box,
    Saliva_PCR_results:$Saliva_PCR_results, 
    Saliva_CT_value :$Saliva_CT_value, 
    Saliva_Plaque_Assay_Titer_PFU_per_ml :$Saliva_Plaque_Assay_Titer_PFU_per_ml,
    Saliva_Plaque_Assay_Ct_value :$Saliva_Plaque_Assay_Ct_value, 
		Stool_Sample :$Stool_Sample, 
    Stool_Tube_number :$Stool_Tube_number, 
    Stool_deidentification_number :$Stool_deidentification_number, 
    Stool_RNA_PCR :$Stool_RNA_PCR, 
    stool_RNA_CT_value:$stool_RNA_CT_value, 
    Stool_RNA_ddPCR :$Stool_RNA_ddPCR, 
    Stool_RNA_ddPCR_value :$Stool_RNA_ddPCR_value
    }})
  {uninfectedInventory{
    Record_ID
  }}}`;

export const GetQuestions = gql`
query{
  quetions{
    id,
    question
  }
}`;

/////THE FOUR TABLES 
  // 1) patient_Metadata

  export const GetPatient_metadata = gql`
  query{
    patientMetadata{
      Record_ID, 
      Consent_date, 
      Date_of_Positive_SARSCOV2_PCR, 
      End_Date,
      Disease_Severity_Category, 
      Age,
      Age_range,
      Date_of_Birth, 
      Sex,
      Race_or_Ethnicity,
      Height_in_mts,
      Weight_in_kg,
      BMI, 
      BMI_Range_in_Text,
      Employed,
      Tobacco_Use, 
      packs_per_day, 
      number_of_years, 
      How_many_other_individuals_are_in_the_participants_household,
      Zipcode,
      Date_of_first_collection,
      Number_of_days_between_PCR_plus_and_first_collection,
      Date_of_second_collection, 
      Number_of_days_between_PCR_plus_and_second_collection,
      Date_of_third_collection, 
      Number_of_days_between_PCR_plus_and_third_collection,
      Date_of_fourth_collection, 
      Number_of_days_between_PCR_plus_and_fourth_collection,
      Date_of_fifth_collection, 
      Number_of_days_between_PCR_plus_and_fifth_collection, 
      Hospitalized,
      Intubation,
      Oxygen_used_at_hospital,
      If_yes_how_much_oxygen,
      Diagnosed_with_DVT_or_PE_clot_after_diagnosis,
      If_yes_to_VTE_was_it_a_PE_or_DVT,
      If_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE,
      Medications_Taking_at_Time_of_COVID19_diagnosis,
      Past_Medical_History, 
      Other_Complications, 
      convalescent_plasma, 
      first_dose_conval_plasma, 
      Initial_COVID_Symptoms,
      visit_count, 
      Visit_date, 
      days_post_PCR,
      No_PASC_is_0_PASC_is_1,
      any_symptoms, 
      headache,
      dizziness, 
      loss_of_consciousness,
      deafness,
      numbness_in_extremities, 
      tingling_inextremities,
      burning_sensation_in_extremities,
      loss_of_taste_if_yes_for_how_long, 
      loss_of_smell_if_yes_for_how_long,
      change_in_taste, 
      forgetful_or_absent_minded,
      confusion, 
      difficulty_concentrating,
      eye_pain,
      eye_redness, 
      eye_tearing,
      light_sensitivity,
      floaters, 
      loss_of_vision, 
      blurry_vision,
      flashes_of_light,
      eye_burning, 
      sore_throat,
      runny_nose_or_congestestion,
      sinusitis,
      facial_pressure, 
      neck_pain,
      mouth_sores, 
      palpitations,
      chest_pain, 
      lower_extremity_swelling, 
      chest_burning,
      chest_pressure,
      rapid_heart_rate,
      difficulty_breathing_dyspnea, 
      cough,
      phlegm_in_back_of_throat, 
      wheezing, 
      abdominal_pain, 
      diarrhea,
      nausea,
      reflux,
      constipation,
      vomiting,
      rash,
      easy_bruising,
      dry_skin,
      itching, 
      jaundice,
      muscleor_body_aches_myalgia,
      exercise_intolerance,
      joint_pain, 
      weakness, 
      back_pain, 
      erectile_dysfunction,
      amenorrhea, 
      fevers, 
      fatigue, 
      appetite_loss,
      anxiety, depression, 
      difficulty_sleeping,
      bleeding,
      clot, 
      hair_loss,
      night_sweats,
      Other, 
      Other_text,
      Are_you_seeing_a_physician_for_these_symptoms,
      What_medications_are_you_taking_for_these_symptoms,
      Have_you_received_the_vaccine,
      Pfizer1_Moderna2_astrazenaca3_other4,
      date_of_first_vaccine,
      Did_you_receive_the_second_dose,
      date_of_second_vaccine
    }
  }`;

  // 2) Patient_Inventories

export const GetPatient_Inventories = gql`
query{
  patientInventories{
    record_id, 
    visit_count,
    Date_of_positive_SARS_COV2_PCR, 
    date_of_first_collection, 
    number_of_days_betwen_PCR_plus_and_first_collection,
    platelet_panel_1, 
    platelet_panel_2,
    platelet_panel_3,
    whole_blood_panel,
    PBMC_panel, 
    plasma, 
    plasma_tubes, 
    plasma_ul_per_tube,
    serum, serum_tubes, 
    serum_ul_per_tube, 
		PBMC_tubes, 
    PBMC_location, 
    cell_count_per_tube, 
    cell_count_total, 
    NP_tubes, 
    NP_storage, 
    NP_PCR_Result, 
    NP_CT_value, 
		NP_Plaque_Assay_Titer_PFU_per_ml, 
    NP_Plaque_Assay_Ct_Value,
    Saliva_sample_No, 
    saliva_sample_No_VTM_number_of_tubes, 
		Saliva_Sample_No_VTM_ul_amount_per_tube, 
    Saliva_sample_with_VTM, 
    Saliva_plus_VTM_tubes,
    Saliva_plus_VTM_storage_box, 
		Saliva_PCR_Results, 
    Saliva_CT_value, 
    Saliva_Plaque_Assay_Titer_PFU_per_ml,
    Saliva_Plaque_Assay_Ct_Value, 
    Stool_Sample, 
		Stool_Tube_number, 
    Stool_deidentification_number, 
    Stool_RNA_PCR, 
    Stool_RNA_CT_value,
    Stool_RNA_ddPCR, 
    Stool_RNA_ddPCR_value
  }}`;
// 3) uninfected metadata

export const GetUninfected_Metadata = gql`
query{
  uninfectedMetadata {
    Record_ID
    Disease_severity_category
    Age
    Age_range
    Date_of_Birth
    Sex
    Race_or_Ethnicity
    Height
    Weight_in_kg
    BMI
    BMI_range
    Date_of_positive_SARS_COV2_PCR
    Date_of_first_collection
    Past_medical_history
    Employed
    Tobacco_use
    packs_per_day
    number_of_years
    number_of_other_individuals_in_participant_household
    Zipcode
    Comments
  }
}`;

// 4) unifected inventories

export const GetUninfected_Inventories = gql`
query{
  uninfectedInventories{  
    Record_ID, 
    visit_count, 
    Date_of_Positive_SARS_COV2_PCR, 
		Date_of_first_collection,
    number_of_days_between_PCR_plus_and_first_collection,
		platelet_panel_1, 
    platelet_panel_2, 
    platelet_panel_3, 
    whole_blood_panel, 
    PBMC_panel,
		Plasma, 
    Plasma_tubes, 
    plasma_ul_per_tube,
    Serum,
    Serum_tubes, 
    Serum_ul_per_tube, 
		PBMC_tubes,
    PBMC_location, 
    Cell_count_per_tube, 
    Cell_count_total, 
    NP_tubes, 
    NP_storage_box, 
		NP_PCR_Result, 
    NP_CT_value,
    NP_Plaque_Assay_Titer_PFU_per_ml,
    NP_Plaque_Assay_Ct_Value, 
    Saliva_Sample_No_VTM, 
		Saliva_Sample_No_VTM_number_of_tubes, 
    Saliva_sample_No_VTM_ul_amount_per_tube, 
    Saliva_Sample_with_VTM, 
    Saliva_plus_VTM_tubes, 
		Saliva_plus_VTM_Storage_box, 
    Saliva_PCR_results, 
    Saliva_CT_value, 
    Saliva_Plaque_Assay_Titer_PFU_per_ml,
    Saliva_Plaque_Assay_Ct_value, 
		Stool_Sample, 
    Stool_Tube_number, 
    Stool_deidentification_number, 
    Stool_RNA_PCR, 
    stool_RNA_CT_value, 
    Stool_RNA_ddPCR, 
    Stool_RNA_ddPCR_value
  }
}`;

//////////////Queries Part////////////////////////////////////////

// Question 1
export const Question1 = gql`
query{
  sAcute1s(where:{visit_count_gt:1}){
   id,
   record_id,
   visit_count,
   pcr_plus_date,
   visit_date,
   visit_number,
   days_post_pcr_plus,
   any_symptoms,
   headache,
   dizziness,
   loss_of_consciousness,
   deafness,
   numbness_in_extremities,
   tingling_in_extremities,
   burning_sensation_in_extremities,
   loss_of_taste,
   loss_of_smell,
   change_in_taste,
   forgetful_or_absent_minded,
   confusion,
   difficulty_concentrating,
   eye_pain,
   eye_redness,
   eye_tearing,
   light_sensitivity,
   floaters,
   loss_of_vision,
   blurry_vision,
   flashes_of_light,
   eye_burning,
   sore_throat,
   runny_nose_or_congestion,
   sinusitis,
   facial_pressure,
   neck_pain,
   mouth_sores,
   palpitations,
   chest_pain,
   lower_extremity_swelling,
   chest_burning,
   chest_pressure,
   rapid_heart_rate,
   difficulty_breathing,
   cough,
   phlegm_in_back_of_throat,
   wheezing,
   abdominal_pain,
   diarrhea,
   nausea,
   reflux,
   constipation,
   vomiting,
   rash,
   easy_bruising,
   dry_skin,
   itching,
   jaundice,
   muscle_or_body_aches,
   exercise_intolerance,
   joint_pain,
   weakness,
   back_pain,
   erectile_dysfunction,
   amenorrhea,
   fevers,
   fatigue,
   appetite_loss,
   anxiety,
   depression,
   difficulty_sleeping,
   bleeding,
   clot,
   hair_loss,
   night_sweats,
   other,
   Are_you_seeing_a_physician_for_these_symptoms,
   what_medications_are_you_taking_for_these_symptoms,
   have_you_received_the_vaccine,
   pfizer1_moderna2_astrazenaca3_other4,
   date_of_first_vaccine,
   did_you_receive_the_second_dose,
   date_of_second_vaccine
   

  }
}`;



// Question 2
export const Question2 =gql`
query{
  noCoCoBioBloods(where:{pbmc_null:true}){
   id,
    pbmc,
    record_id,
    visit_count,
    date_visit,
    blood_sample1,
    tubes,
    tubes_comment,
    pbmc,
    pbmc_location,
    pbmc_comment,
    plasma_in_ml,
    plasma_comment,
    serum,
    serum_comment,
    cell_count_per_tube_per_million,
    cell_count_per_million,
    cell_count_comment
  
  }
}` ;


// Question 3
export const Question3 =gql`
query{
  dAcutes(where:{sex_0_is_male_and_1_is_female:0,disease_severity_category_null:false}){
   	id,
    disease_severity_category,
    consent_date,
    date_of_positive_SARS_CoV2_PCR,
    end_date,
    disease_severity_category,
    no_PASC_is_0_and_PASC_is_1,
    age,
    age_range,
    date_of_birth,
    sex_0_is_male_and_1_is_female,
    race_or_ethnicity,
    height_in_mt,
    weight_in_kg,
    BMI,
    BMI_in_range,
    employed,
    tobacco_use_if_yes_how_much,
    how_many_other_individuals_are_in_the_participants_household,
    zipcode,
    Notes_for_date_of_positive_SARSCoV2_PCR,
    date_of_first_collection,
    number_of_days_between_PCR_plus_and_first_collection,
    date_of_second_collection,
    number_of_days_between_PCR_plus_and_second_collection,
    date_of_third_collection,
    number_of_days_between_PCR_plus_and_third_collection,
    date_of_fourth_collection,
    number_of_days_between_PCR_plus_and_fourth_collection,
    hospitalized,
    diagnosed_with_DVT_or_PE_clot_after_diagnosis,
    oxygen_used_at_hospital,
    intubation,
    past_medical_history,
    other_complications,
    can_we_follow_up_with_you_in_6_months,
    comments,
    initial_COVID_symptoms,
    record_id,
    if_yes_how_much_oxygen,
    medications_taking_at_time_of_COVID19_diagnosis

  }
}`;


//Question 4
export const Question4 =gql`
query{
  nocoCobioSalivas(where: { saliva_pcr_results: "POS"} ){
  record_id,
  id,
  visit_count,
  date_visit,
  saliva_sample_in_ml,
  saliva_sample_comments,
  filtered_saliva_pcr_results,
  saliva_vtm,
  saliva_pcr_results

}

nocoCobioStools(where:{ddPCR_RNA_StoolCarol_Lab : "POS"}){
  ddPCR_RNA_StoolCarol_Lab,
  id,
  record_id,
  visit_number,
  date_visit,
  stool_sample,
  stool_tube_number,
  stool_labels_rna_or_dna,
  stool_rna_pcr_ebbel_lab,
  ddPCR_RNA_StoolCarol_Lab,
  stool_comments
} 
nocoCobioNasalpharygenals(where : {np_pcr_result : "POS"}){
  record_id,
  id,
  visit_count,
  date_visit,
  np_sample,
  np_pcr_result,
  np_comments
  }
}`;

// Question 5
export const Question5 =gql`
query{
nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
  ddPCR_RNA_StoolCarol_Lab,
  id,
  record_id,
  visit_number,
  date_visit,
  stool_sample,
  stool_tube_number,
  stool_labels_rna_or_dna,
  stool_rna_pcr_ebbel_lab,
  ddPCR_RNA_StoolCarol_Lab,
  stool_comments
}
dControls{
  disease,
  age,
  age_range,
  date_of_birth,
  race_or_ethnicity,
  height_mts,
  Weight_in_pounds,
  BMI,
  BMI_text,
  date_of_positive_SARS_CoV2_PCR,
  date_of_first_collection,
  hospitalized,
  diagnosed_with_DVT_or_PE_clot_after_diagnosis,
  oxygen_used_at_hospital,
  If_yes_how_much_oxygen,
  Intubation,
  past_medical_history,
  Medications_Taking_at_Time_of_COVID19_diagnosis,
  employed,
  Tobacco_Use_If_yes_how_much,
  how_many_other_individuals_are_in_the_participants_household,
  other_complications,
  consent_date,
  end_date,
  county_zip_code,
  comments,
  record_id,
  sex
}
}`;


// Question 6
export const Question6 =gql`
query{

nocoCobioStools(where: { stool_sample_ne: null }) {
  ddPCR_RNA_StoolCarol_Lab,
  id,
  record_id,
  visit_number,
  date_visit,
  stool_sample,
  stool_tube_number,
  stool_labels_rna_or_dna,
  stool_rna_pcr_ebbel_lab,
  ddPCR_RNA_StoolCarol_Lab,
  stool_comments


}
}`;

//Question 9
export const Question9 =gql`
query
{
  noCoCoBioBloods(where: { pbmc_ne: null }) {

    id,
    pbmc,
    record_id,
    visit_count,
    date_visit,
    blood_sample1,
    tubes,
    tubes_comment,
    pbmc,
    pbmc_location,
    pbmc_comment,
    plasma_in_ml,
    plasma_comment,
    serum,
    serum_comment,
    cell_count_per_tube_per_million,
    cell_count_per_million,
    cell_count_comment
    

  }
  nocoCobioStools(where: { stool_sample_ne: null }) {
  id,
  record_id,
  visit_number,
  date_visit,
  stool_sample,
  stool_tube_number,
  stool_labels_rna_or_dna,
  stool_rna_pcr_ebbel_lab,
  ddPCR_RNA_StoolCarol_Lab,
  stool_comments
  }
}`;

//Question 10
export const Question10 =gql`

 query {
   nocoCobioSalivas(where: { saliva_pcr_results: "POS" }) {
    record_id,
    id,
    visit_count,
    date_visit,
    saliva_sample_in_ml,
    saliva_sample_comments,
    filtered_saliva_pcr_results,
    saliva_vtm,
    saliva_pcr_results
     
   }
   nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
    id,
    record_id,
    visit_number,
    date_visit,
    stool_sample,
    stool_tube_number,
    stool_labels_rna_or_dna,
    stool_rna_pcr_ebbel_lab,
    ddPCR_RNA_StoolCarol_Lab,
    stool_comments

   }

  dAcutes {
    id,
    disease_severity_category,
    consent_date,
    date_of_positive_SARS_CoV2_PCR,
    end_date,
    disease_severity_category,
    no_PASC_is_0_and_PASC_is_1,
    age,
    age_range,
    date_of_birth,
    sex_0_is_male_and_1_is_female,
    race_or_ethnicity,
    height_in_mt,
    weight_in_kg,
    BMI,
    BMI_in_range,
    employed,
    tobacco_use_if_yes_how_much,
    how_many_other_individuals_are_in_the_participants_household,
    zipcode,
    Notes_for_date_of_positive_SARSCoV2_PCR,
    date_of_first_collection,
    number_of_days_between_PCR_plus_and_first_collection,
    date_of_second_collection,
    number_of_days_between_PCR_plus_and_second_collection,
    date_of_third_collection,
    number_of_days_between_PCR_plus_and_third_collection,
    date_of_fourth_collection,
    number_of_days_between_PCR_plus_and_fourth_collection,
    hospitalized,
    diagnosed_with_DVT_or_PE_clot_after_diagnosis,
    oxygen_used_at_hospital,
    intubation,
    past_medical_history,
    other_complications,
    can_we_follow_up_with_you_in_6_months,
    comments,
    initial_COVID_symptoms,
    record_id,
    if_yes_how_much_oxygen,
    medications_taking_at_time_of_COVID19_diagnosis



   }

   dConvalescent1s {
     

    at_least_two_weeks_out_from_PCR,
    consent_date,
    end_date,
    requirement_yale_imapct,
    no_PASC_is_0_and_PASC_is_1,
    at_least_2_weeks_out_from_acute_phase,
    age,
    age_range,
    sex_male_is_0_and_female_is_1,
    race_or_ethnicity,
    height_m,
    weight_is_kg,
    BMI,
    BMI_T,
    employed_full_time_student_retired_on_disablity_not_employed,
    still_employed,
    tobacco_use_neversmoked_0_pastsmoker_1_or_currentsmoker_2,
    packs_per_day,
    number_of_years,
    how_many_other_individuals_are_in_the_participants_household,
    zipcode,
    other_complications,
    record_id,
    date_of_positive_SARSCoV2_PCR,
    date_of_first_collection,
    number_of_days_between_PCR_plus_and_first_collection,
    date_of_second_collection,
    number_of_days_between_PCR__and_second_collection,
    date_of_third_collection,
    number_of_days_between_PCR_and_third_collection,
    date_of_fourth_collection,
    number_of_days_between_PCR_and_fourth_collection,
    Intubation,
    oxygen_used_at_hospital,
    if_yes_how_much_oxygen,
    diagnosed_with_DVT_or_PE_clot_after_diagnosis,
    if_yes_to_VTE_was_it_a_PE_or_DVT,
    if_yes_to_DVT_locations_RLE_RUE_LLE_and_LUE,
    medications_used_to_treat_COVID19,
    past_medical_history,
    medications_taking_at_time_of_COVID19_diagnosis,
    can_we_follow_up_with_you_in_6_months,
    Comments,
    hospitalized,
    date_of_birth

   }
 }`;
