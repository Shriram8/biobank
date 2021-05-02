import { gql } from "@apollo/client";
export const GET_OT_PROCESS_DATA = gql`
query($otID:ID!,$date:String){
    operationTheaters(where:{id:$otID}){
      
      name
      processes_data( where: {Date:$date} sort:"created_at:ASC" ){
         
       
        process_detail{
          process_name 
        }
        Date
        question{
           
            Question
            type 
           }
        
       
       app_user{
          name
          userType
        }
        Answer
        check_editable{
           editable
        }
      }
    }
  }
`;
