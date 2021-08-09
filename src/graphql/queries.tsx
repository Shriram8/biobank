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

export const GetDActues= gql`
  query{
    dControls{
      id,
      record_id,
      disease,
      age,
      sex,
      age_range,
      date_of_birth,
      race_or_ethnicity,
      height_mts,
      Weight_in_pounds,
      BMI  
    }
  }
`;

// $operation_theater: ID!
//     $question: ID!
//     $app_user: ID!
//     $process_detail: ID!
//     $Date: Date
//     $Answer: String
//     $instance: Int
//     $branch: ID!

export const UploadSAcute1= gql`
mutation(
  $record_id:String
  $visit_count:Int
  $pcr_plus_date: Date
  $visit_date : Date
  $days_post_pcr_plus : Int
){
  createSAcute1(input:{data:{record_id:$record_id,visit_count:$visit_count,
    pcr_plus_date: $pcr_plus_date,visit_date : $visit_date,days_post_pcr_plus:$days_post_pcr_plus}}){
    sAcute1{
      id
    } 
  } 
}
`;

export const GetQuestions = gql`
query{
  quetions{
    id,
    question
  }
}`;


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
