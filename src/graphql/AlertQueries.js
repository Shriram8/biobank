import { gql } from "@apollo/client";
export const GET_ALL_OTS = gql`
query{
    operationTheaters{
      id
      name 
    }
  }
`

export const GET_ALL_OTS_FOR_ALERTS = gql`
query($userID:ID!){
    operationTheaters{
      id
      name 
    }
    appUser(id:$userID){
      id
      branch{
        id
      }
    }
  } 
`