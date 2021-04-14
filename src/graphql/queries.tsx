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
