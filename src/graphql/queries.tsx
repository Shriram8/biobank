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
    
    
  }
}` ;


// Question 3
export const Question3 =gql`
query{
  dAcutes(where:{sex_0_is_male_and_1_is_female:0,disease_severity_category_null:false}){
   	id,
    disease_severity_category
  }
}`;

//Question 4
export const Question4 =gql`
query{
  nocoCobioSalivas(where: { saliva_pcr_results: "POS"} ){
  record_id
  saliva_pcr_results
}

nocoCobioStools(where:{ddPCR_RNA_StoolCarol_Lab : "POS"}){
  ddPCR_RNA_StoolCarol_Lab
  record_id
} 
nocoCobioNasalpharygenals(where : {np_pcr_result : "POS"}){
  record_id
  np_pcr_result
  }
}`;

// Question 5
export const Question5 =gql`
query{
nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
  visit_number
  ddPCR_RNA_StoolCarol_Lab
  record_id
}
dControls{
  BMI
  record_id
  sex
}
}`;


// Question 6
export const Question6 =gql`
query{

nocoCobioStools(where: { stool_sample_ne: null }) {
  visit_number
  stool_sample
  record_id
}
}`;

//Question 9
export const Question9 =gql`
query
{
  noCoCoBioBloods(where: { pbmc_ne: null }) {
    record_id
    pbmc
    date_visit
  }
  nocoCobioStools(where: { stool_sample_ne: null }) {
    record_id
    stool_sample
    date_visit
  }
}`;

//Question 10
export const Question10 =gql`

 query {
   nocoCobioSalivas(where: { saliva_pcr_results: "POS" }) {
     saliva_pcr_results
    record_id
   }
   nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
     record_id
     ddPCR_RNA_StoolCarol_Lab
   }

  dAcutes {
     record_id
     BMI
     age
     sex_0_is_male_and_1_is_female
   }

   dConvalescent1s {
     record_id
     age
     BMI
     sex_male_is_0_and_female_is_1
   }
 }`;
