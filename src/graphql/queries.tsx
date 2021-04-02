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