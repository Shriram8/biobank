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

export const GetQuestions = gql`
query{
  quetions{
    id,
    question
  }
}`;


// Question 1
// query{
//   sAcute1s(where:{visit_count_gt:1}){
//    id,
//   }
// }

// Question 2
// query{
//   noCoCoBioBloods(where:{pbmc_null:true}){
//    id,
//     pbmc,
//     record_id,
    
//   }
// }

//Question 3
// query{
//   dAcutes(where:{sex_0_is_male_and_1_is_female:0,disease_severity_category_null:false}){
//    	id,
//     disease_severity_category
//   }
// }

//Question 4

// nocoCobioSalivas(where: { saliva_pcr_results: "POS"} ){
//   record_id
//   saliva_pcr_results

// }

// nocoCobioStools(where:{ddPCR_RNA_StoolCarol_Lab : "POS"}){
//   ddPCR_RNA_StoolCarol_Lab
//   record_id
// } 
// nocoCobioNasalpharygenals(where : {np_pcr_result : "POS"})
// {
//   record_id
//   np_pcr_result
// }

// Question 5

// nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
//   visit_number
//   ddPCR_RNA_StoolCarol_Lab
//   record_id
// }
// dControls{
//   BMI
//   record_id
//   sex
// }


// Question 6

// nocoCobioStools(where: { stool_sample_ne: null }) {
//   visit_number
//   stool_sample
//   record_id
// }
// }

//Question 9

// {
//   noCoCoBioBloods(where: { pbmc_ne: null }) {
//     record_id
//     pbmc
//     date_visit
//   }
//   nocoCobioStools(where: { stool_sample_ne: null }) {
//     record_id
//     stool_sample
//     date_visit
//   }
// }


//Question 10

// {
//   nocoCobioSalivas(where: { saliva_pcr_results: "POS" }) {
//     saliva_pcr_results
//     record_id
//   }
//   nocoCobioStools(where: { ddPCR_RNA_StoolCarol_Lab: "POS" }) {
//     record_id
//     ddPCR_RNA_StoolCarol_Lab
//   }

//   dAcutes {
//     record_id
//     BMI
//     age
//     sex_0_is_male_and_1_is_female
//   }

//   dConvalescent1s {
//     record_id
//     age
//     BMI
//     sex_male_is_0_and_female_is_1
//   }
// }
