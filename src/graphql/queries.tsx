import { gql } from "@apollo/client";
export const GetUserDetails = gql`
  query($userID:ID!){
      appUser(id: $userID){
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
query($processID:ID!){
      processDetail(id: $processID){
        id,
    		questions{
          id,
          Question,
        }
      }
    }
`;