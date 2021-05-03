import { gql } from "@apollo/client";
export const GetUserDetails = gql`
  query($userID: String) {
    appUsers(where: { uid: $userID }) {
      id
      name
      userType
      password
    }
  }
`;

export const GetResourcesDetails = gql`
  query {
    appResources {
      id
      name
    }
  }
`;

export const GetStaffUsers = gql`
  query {
    appUsers(where: { userType: "OTStaff" }) {
      id
      name
      userType
    }
  }
`;

export const GetAdminUsers = gql`
  query {
    appUsers(where: { userType: "OTAdmin" }) {
      id
      name
      userType
    }
  }
`;

export const GetInchargeUsers = gql`
  query {
    appUsers(where: { userType: "OTIncharge" }) {
      id
      name
      userType
    }
  }
`;

export const GetProcessesDetails = gql`
  query($resourceID: ID!) {
    appResource(id: $resourceID) {
      process_details {
        id
        Number
        process_name
        questions {
          id
        }
      }
    }
  }
`;

export const GetQuestionDetails = gql`
  query(
    $processID: ID!
    $operation_theater: ID!
    $app_user: ID!
    $instance: Int
    $Date: String
  ) {
    processDetail(id: $processID) {
      id
      questions {
        id
        Question
        type
      }
    }
    processesData(
      where: {
        app_user: $app_user
        process_detail: $processID
        operation_theater: $operation_theater
        instance: $instance
        Date: $Date
      }
    ) {
      id
      check_editable {
        id
      }
      question {
        id
      }
      Answer
      created_at
      Date
    }
  }
`;

export const GetAnswersProgress = gql`
  query(
    $operation_theater: ID!
    $app_user: ID!
    $processID: ID!
    $instance: Int
    $Date: Date
  ) {
    processesData(
      where: {
        app_user: $app_user
        process_detail: $processID
        operation_theater: $operation_theater
        instance: $instance
        Date: $Date
      }
    ) {
      id
      Answer
      check_editable {
        id
      }
      process_detail {
        id
      }
    }
  }
`;

export const GetSharedResource_OperationTheaters = gql`
  query {
    appResources(where: { resourceType: "SharedResource" }) {
      id
      name
    }
    operationTheaters {
      id
      name
    }
  }
`;

export const preProcessProgress = gql`
  query(
    $operation_theater: ID!
    $app_user: ID!
    $Date: Date
    $instance: Int
    $process_detail: ID!
  ) {
    processesData(
      where: {
        operation_theater: $operation_theater
        app_user: $app_user
        Date: $Date
        instance: $instance
        process_detail: $process_detail
        check_editable_null: false
      }
    ) {
      id
      Answer
      Date
      process_detail {
        id
      }
    	check_editable{
        id,
        processCleared,
      }
      instance
      operation_theater {
        id
        name
      }
    }
  }
`;

export const GetSurgeryDetails = gql`
  query($operation_theater: ID!, $app_user: ID!, $Date: Date) {
    appResources(
      sort: "processOrder:asc"
      where: { resourceType: "OperationTheater" }
    ) {
      id
      name
      processOrder
      process_details {
        id
      }
    }
    questions(where: { id: 6 }) {
      processes_data(
        where: {
          operation_theater: $operation_theater
          app_user: $app_user
          Date: $Date
        }
      ) {
        id
        Answer
        Date
        operation_theater {
          id
        }
      }
    }
  }
`;
export const Check_Process_Progress = gql`
query($otID:ID!,$date:String,$userId:ID!){
  appResources( 
    sort: "processOrder:asc"
    where: { resourceType: "OperationTheater" }
     ){
    name
    processOrder
    process_details{
      id
      Number
      process_name
      processes_data(
        sort: "id:asc"
        where:{app_user:$userId operation_theater:{id:$otID} Date:$date}){
        Date
        id
        Answer
        operation_theater{
          id
          name
  
        }
        instance
        question{
          Question
        }
        check_editable{
          id
        }
      }
      
    }
  
  }
}
`
// export const GetPreProcessDetails = gql`
// query($operationTheaterID:ID!){

// }
// `;

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
    $Date: Date
    $Answer: String
    $instance: Int
  ) {
    createProcessesDatum(
      input: {
        data: {
          operation_theater: $operation_theater
          Answer: $Answer
          question: $question
          app_user: $app_user
          process_detail: $process_detail
          Date: $Date
          instance: $instance
        }
      }
    ) {
      processesDatum {
        id
        Answer
        check_editable {
          id
        }
        question {
          id
        }
        operation_theater {
          id
        }
        created_at
        process_detail {
          id
        }
      }
    }
  }
`;

export const SubmitCompleted =gql`
mutation(
  $processes_data:[ID], $processCleared:Boolean
){
  createCheckEditable(input:{data:{editable:true,processes_data:$processes_data,processCleared:$processCleared}}){
    checkEditable{
      id,
      editable,
      processCleared,
    }
  }
}
`;

export const UpdateSubmittedAnswerForQuestion = gql`
  mutation($question_Id: ID!, $Answer: String) {
    updateProcessesDatum(
      input: { where: { id: $question_Id }, data: { Answer: $Answer } }
    ) {
      processesDatum {
        id
        Answer
      }
    }
  }
`;

export enum ENUM_APPUSERS_USERTYPE {
  OTIncharge,
  OTStaff,
  OTAdmin,
}

export const addNewUser = gql`
  mutation(
    $name: String
    $password: String!
    $uid: String
    $userType: ENUM_APPUSERS_USERTYPE
  ) {
    createAppUser(
      input: {
        data: {
          name: $name
          password: $password
          uid: $uid
          userType: $userType
        }
      }
    ) {
      appUser {
        id
        name
      }
    }
  }
`;

export const deleteUser = gql`
  mutation($id: ID!) {
    deleteAppUser(input: { where: { id: $id } }) {
      appUser {
        id
      }
    }
  }
`;
