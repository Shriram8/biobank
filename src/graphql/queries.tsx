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

export const GetDetailsWithEmployeeId = gql`
  query($employeeid: String) {
    appUsers(
      where: { _or: [{ employeeid: $employeeid }, { uid: $employeeid }] }
    ) {
      id
      name
      userType
      password
      resetpassword
      branch {
        id
      }
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

export const GetDrugList = gql`
  query {
    druglists {
      id
      name
      quantity
      type
    }
  }
`;

export const GetUsers = gql`
  query($branch: ID!) {
    appUsers(where: { branch: $branch, active: true }) {
      id
      name
      userType
      active
    }
  }
`;

export const GetUserDataById = gql`
  query($userId: ID!) {
    appUsers(where: { id: $userId }) {
      id
      name
      userType
      employeeid
      gender
      uid
      branch {
        id
        name
      }
    }
  }
`;

export const GetPassword = gql`
  query($userId: ID!) {
    appUsers(where: { id: $userId }) {
      id
      password
    }
  }
`;

export const UpdatePassword = gql`
  mutation($userId: ID!, $password: String!, $resetpassword: Boolean!) {
    updateAppUser(
      input: {
        where: { id: $userId }
        data: { password: $password, resetpassword: $resetpassword }
      }
    ) {
      appUser {
        id
        name
      }
    }
  }
`;

export const DeactivateUser = gql`
  mutation($userId: ID!, $active: Boolean!) {
    updateAppUser(
      input: { where: { id: $userId }, data: { active: $active } }
    ) {
      appUser {
        id
        name
      }
    }
  }
`;

export const ResetPassword = gql`
  mutation($userId: ID!, $resetpassword: Boolean!) {
    updateAppUser(
      input: { where: { id: $userId }, data: { resetpassword: $resetpassword } }
    ) {
      appUser {
        id
        name
        branch {
          id
        }
      }
    }
  }
`;
export const GetAutoClaveDetails = gql`
  query($Date: String) {
    processDetails(where: { id: [4, 5, 6] }) {
      id
      processes_data(where: { Date: $Date }) {
        Date
        check_editable {
          processCleared
        }
      }
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

export const GetGaDetails = gql`
  query($Date: String) {
    processDetails(where: { id: [4, 5, 6] }) {
      id
      processes_data(where: { Date: $Date }) {
        Date
        check_editable {
          processCleared
        }
      }
    }
  }
`;

export const GetQuestionDetails = gql`
  query(
    $processID: ID!
    $operation_theater: ID!
    $instance: Int
    $Date: String
  ) {
    processDetail(id: $processID) {
      id
      questions(sort: "questionSequenceNumber:asc") {
        id
        Question
        type
      }
    }
    processesData(
      where: {
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
  query($operation_theater: ID!, $processID: ID!, $instance: Int, $Date: Date) {
    processesData(
      where: {
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
        processCleared
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

export const autoClaveProgress = gql`
  query(
    $operation_theater: ID!
    $Date: Date
    $instance: Int
    $process_detail: ID!
  ) {
    processesData(
      where: {
        operation_theater: $operation_theater
        Date: $Date
        instance: $instance
        process_detail: $process_detail
        check_editable_null: false
      }
    ) {
      id
      Answer
      check_editable {
        id
        processCleared
      }
    }
  }
`;

export const preProcessProgress_OTStaff = gql`
  query(
    $operation_theater: ID!
    $Date: Date
    $instance: Int
    $process_detail: ID!
  ) {
    processesData(
      where: {
        operation_theater: $operation_theater
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
      check_editable {
        id
        processCleared
      }
      instance
      operation_theater {
        id
        name
      }
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
      check_editable {
        id
        processCleared
      }
      instance
      operation_theater {
        id
        name
      }
    }
  }
`;

export const GetSurgeryDetails_OTStaff = gql`
  query($operation_theater: ID!, $Date: Date) {
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
        where: { operation_theater: $operation_theater, Date: $Date }
      ) {
        id
        Answer
        Date
        operation_theater {
          id
        }
      }
    }
    processesData(
      where: {
        operation_theater: $operation_theater
        Date: $Date
        check_editable_null: false
      }
    ) {
      id
      Answer
      Date
      process_detail {
        id
      }
      check_editable {
        id
        processCleared
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
  query($otID: ID!, $date: String) {
    appResources(
      sort: "processOrder:asc"
      where: { resourceType: "OperationTheater" }
    ) {
      name
      processOrder
      process_details {
        id
        Number
        process_name
        processes_data(
          sort: "id:asc"
          where: { operation_theater: { id: $otID }, Date: $date }
        ) {
          Date
          id
          Answer
          operation_theater {
            id
            name
          }
          instance
          question {
            Question
          }
          check_editable {
            id
            processCleared
          }
        }
      }
    }
  }
`;
// query($otID: ID!, $date: String, $userId: ID!) {
//   appResources(
//     sort: "processOrder:asc"
//     where: { resourceType: "OperationTheater" }
//   ) {
//     name
//     processOrder
//     process_details {
//       id
//       Number
//       process_name
//       processes_data(
//         sort: "id:asc"
//         where: {
//           app_user: $userId
//           operation_theater: { id: $otID }
//           Date: $date
//         }
//       ) {
//         Date
//         id
//         Answer
//         operation_theater {
//           id
//           name
//         }
//         instance
//         question {
//           Question
//         }
//         check_editable {
//           id
//         }
//       }
//     }
//   }
// }
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

export const SubmitCompleted = gql`
  mutation($processes_data: [ID], $processCleared: Boolean) {
    createCheckEditable(
      input: {
        data: {
          editable: true
          processes_data: $processes_data
          processCleared: $processCleared
        }
      }
    ) {
      checkEditable {
        id
        editable
        processCleared
      }
    }
  }
`;

export const UpdateSubmitCompleted = gql`
  mutation($checkEditable_Id: ID!) {
    updateCheckEditable(
      input: {
        where: { id: $checkEditable_Id }
        data: { processCleared: true }
      }
    ) {
      checkEditable {
        id
        editable
        processCleared
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

export const addNewUser = gql`
  mutation(
    $name: String!
    $password: String!
    $uid: String!
    $userType: ENUM_APPUSERS_USERTYPE
    $gender: ENUM_APPUSERS_GENDER
    $employeeid: String
    $active: Boolean!
    $resetpassword: Boolean!
    $branch: ID!
  ) {
    createAppUser(
      input: {
        data: {
          name: $name
          password: $password
          uid: $uid
          userType: $userType
          gender: $gender
          employeeid: $employeeid
          active: $active
          resetpassword: $resetpassword
          branch: $branch
        }
      }
    ) {
      appUser {
        id
        name
        branch {
          id
        }
      }
    }
  }
`;

export const UpdateUser = gql`
  mutation(
    $userId: ID!
    $name: String!
    $userType: ENUM_APPUSERS_USERTYPE
    $gender: ENUM_APPUSERS_GENDER
    $uid: String!
  ) {
    updateAppUser(
      input: {
        where: { id: $userId }
        data: { name: $name, userType: $userType, uid: $uid, gender: $gender }
      }
    ) {
      appUser {
        id
        name
        branch {
          id
        }
      }
    }
  }
`;

export const addNewBranch = gql`
  mutation($name: String!) {
    createBranch(input: { data: { name: $name } }) {
      branch {
        id
        name
      }
    }
  }
`;

export const getBranchDetails = gql`
  query {
    branches {
      id
      name
    }
  }
`;
