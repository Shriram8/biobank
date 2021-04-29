import { gql } from "@apollo/client";
export const GET_ALL_OTS = gql`
query{
    operationTheaters{
      id
      name 
    }
  }
`