import { gql } from "@apollo/client";
export const GET_OT_PROCESS_DETAILS = gql`
query($otID:ID!,$date:String){
    operationTheaters(where:{id:$otID}){
      id
      name
      processes_data( where: {Date:$date} ){
        id
        Date
        question{
          id
          Question
          type
          process_detail{
            id
            
            questions{
              id
              Question
            }
          }
         }
       app_user{
          id
          name
          userType
        }
        check_editable{
          id
          editable
        }
      }
    }
  }
`