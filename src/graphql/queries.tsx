import { gql } from "@apollo/client";
export const GetUserDetails = gql`
  query($userID:String){
      appUsers(where: { uid: $userID }){
        id,
        name,
        userType,
        password,
      }
    }
`;
export const GetResourcesDetails = gql`
query{
      appResources{
        id,
        name,
      }
    }
`;
export const GetProcessesDetails = gql`
query($resourceID:ID!){
      appResource(id: $resourceID){
        process_details{
          id,
          Number,
          process_name,
        }
      }
    }
`;

export const GetQuestionDetails = gql`
query($processID:ID!,
      $operation_theater: ID!
      $app_user: ID!
      $Date:String){
      processDetail(id: $processID){
        id,
    		questions{
          id,
          Question,
          type,
        }
      }
      processesData(where:{
        app_user:$app_user,
        process_detail:$processID,
        operation_theater:$operation_theater,
        Date:$Date}){
        id,
        question{
          id
        }
        Answer,
        created_at,
        Date
      }
    }
`;

export const GetSharedResource_OperationTheaters = gql`
query{
      appResources(where:{resourceType:"SharedResource"}){
        id,
        name
      },
      operationTheaters{
        id,
      	name
      }
    }
`;

export const GetSurgeryDetails = gql`
query($operationTheaterID:ID!){
  appResources(sort: "processOrder:asc",where:{resourceType:"OperationTheater" }){
        id,
        name,
  			processOrder,
  },
  operationTheater(id:$operationTheaterID){
      id,
    	name,
      surgeries{
        id
      }
  }
}
`;

export enum ENUM_RESOURCE_TYPE {
  SharedResource,
  OperationTheater,
}

export const SubmitAnswerForQuestion = gql`
mutation(
    $operation_theater: ID!
    $question: ID!
    $app_user: ID!
    $process_detail: ID!
    $Date:Date
  ){
  createProcessesDatum(input: { data:{operation_theater:$operation_theater,
    question:$question,app_user:$app_user,process_detail:$process_detail,Date:$Date} }) {
    processesDatum{
      id,
      Answer,
      question{
        id
      },
      operation_theater{
        id
      }
      created_at,
      process_detail{
        id
      }
    }
  }
}
`;