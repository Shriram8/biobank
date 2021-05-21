import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {View,Text, TouchableOpacity} from 'react-native'; 
import MessageComponent from '../../screens/messageComponent';
import {client} from '../../src/graphql/ApolloClientProvider';
import {GetAutoClaveDetails,GetSurgeryDetails_OTStaff,preProcessProgress_OTStaff} from '../../src/graphql/queries';

class OTCard extends Component {
// const OTCard = (props)=>{
    //const [renderFlatlistData,setRenderFlatlistData] = useState();
    //const [message,setMessage]=useState(null);
    //const [refresh,setRefresh] = useState(0);
    //const [updateMessage,setUpdateMessage] = useState(0);
    //const [headerColor,setHeaderColor] = useState("")
    //const [headerIcon,setHeaderIcon]= useState("");
    //const [autoClaveCleared,setAutoClaveCleared]= useState(false);
    //const [resultsFetched,setResultsFetched] = useState(0);
    apolloClient = client;
     _data = [];
   preSurgeryProcessCount = 2;
 preSurgeryProcessID = 3; //id from order.
 inBetweenSurgeryProcessID = 4;
 endOfDayProcessID = 5;
 lock = [];
 moduleLock;
 progress = [];
 colorValue = [];
 iconValue = [];
 processCount = [];
 netProgress = [];
 _text;
 red = "#f40000";
 green = "#0fbb5b";
 orange = "#ff8d48";
 alert = "alert-box";
 check = "checkbox-marked";
 minusBox = "minus-box";
 _Result = [];
 _length;
 _headerColor;
 checkPoint = [];
 exitUpdate;
exitUpadteMessage = false;

    constructor(props) {
        super(props);
        const { isFocused } = this.props;
        this.state = {
            resultsFetched: false,
            autoClaveCleared:false,
            headerIcon:"",
            headerColor:"",
            updateMessage:0,
            refresh:0,
            message:null,
            renderFlatlistData:null
        };
    }

    // componentDidUpdate(prevProps, prevState) {
      
    // //place your desired logic here
    // }

    checkforAutoclave(){
      this.setState({autoClaveCleared: null})
      //setAutoClaveCleared(false);
      var process = 3;
      var temp = 0
      this.apolloClient
        .query({
          query: GetAutoClaveDetails,
          variables:{
            Date:new Date().toISOString().slice(0, 10),
            branch:this.props.branch,
          },
          fetchPolicy:"network-only"
        })
        .then((Result) => {
          //console.log("AUTOCLAVE DETAILS_____",Result);
          for(var i=0; i<Result.data.processDetails.length;i++){
            try{
              if(Result.data.processDetails[i].processes_data[0].check_editable.processCleared){
                temp = temp+1;
              }
            }catch{

            }
          }
          if(temp == process){
            this.setState({autoClaveCleared: true})
            //console.log("AUTOCLAVE CLEARED");
            //setAutoClaveCleared(true);
          }
        })

    }


    componentMount(){
      if(this.props.operationTheaterID){
        //this.checkforAutoclave()
        this.setState({message: null})
        this.processCount =[];
        this.progress = [];
        this.netProgress = [];
        this._text = "Ongoing start of the day";
        this._data = [];
        this.lock =[];
        this._Result = [];
        this._length = 0;
        this.colorValue = [];
        this.iconValue = [];
        this.checkPoint = [];
        this.moduleLock = false;
        this.exitUpdate = true;
        
        //console.log("This exit update...",this.exitUpdate)
        this.setState({resultsFetched:false})
        this.apolloClient
        .query({
          query: GetSurgeryDetails_OTStaff,
          variables:{
            operation_theater:parseInt(this.props.operationTheaterID),
            Date:new Date().toISOString().slice(0, 10),
            // app_user:parseInt(userId),
            branch:this.props.branch,
          },
          fetchPolicy:"network-only"
        })
        .then((Result) => {
          //console.log("-----Result",Result,this.props.operationTheaterID);
            for(var i = 0;i<2;i++){
                this._data.push(Result.data.appResources[i]);
                
                if(i==0){
                  this.lock.push(false);
                }
                else{
                  this.lock.push(true);
                }
            }
            this.checkPoint.push(2);
            try{
              
              for(var i = 0; i< Result.data.questions[0].processes_data[0].Answer;i++){
                this._data.push(Result.data.appResources[this.preSurgeryProcessID-1]);
                if(i == 0)
                this.checkPoint.push(3)
                else{
                  this.checkPoint.push(this.checkPoint[this.checkPoint.length-1]+2)
                }
                this.lock.push(true);
                if(i != Result.data.questions[0].processes_data[0].Answer-1){
                  this._data.push(Result.data.appResources[this.inBetweenSurgeryProcessID-1]);
                  this.lock.push(true);
                }
              }
              
            }catch{

            }
            this._data.push(Result.data.appResources[Result.data.appResources.length-1]);
            this.checkPoint.push(this.checkPoint[this.checkPoint.length-1]+1)
            this.lock.push(true);
            //console.log("Data---",_data);
            this.setState({renderFlatlistData: Result.data})
            //setRenderFlatlistData(Result.data);
              for(var i= 0;i<this._data.length;i++){
                this.colorValue[i] = this.orange;
                this.iconValue[i] = this.minusBox;
                this.processCount[i]=this._data[i].process_details.length;
                this.progress[i] = 0;
                this._length = this._length + this.processCount[i];
                    for(var k=0;k<this.processCount[i];k++){
                      this.apolloClient
                      .query({
                        query: preProcessProgress_OTStaff,
                        variables:{
                          operation_theater:parseInt(this.props.operationTheaterID),
                          Date:new Date().toISOString().slice(0, 10),
                          //app_user:parseInt(userId),
                          instance: i,
                          process_detail: this._data[i].process_details[k].id,
                          branch:this.props.branch
                        },
                        fetchPolicy:"network-only"
                      })
                      .then((Result) => {
                        this._Result.push(Result.data);
                        if(this._Result.length == this._length){
                          console.log("RESULTS UPDATED______",this.props.title,this._Result)
                          this.exitUpdate = false;
                          this.setState({resultsFetched:true});
                          
                          //setResultsFetched(prevCount => prevCount + 1);
                        }
                                                
                      })
                    }  
              }
        }) 
      }  
    }

    
  componentDidUpdate(prevState,prevProps) {

      if(prevProps.updateExitMessage != this.props.updateExitMessage && this.exitUpadteMessage){
        if(this.props.updateExitMessage){
          this.exitUpadteMessage = false;
          //this.exitUpdate = false;
          this.setState({resultsFetched:false});
          
          //console.log("Update Exit Message");
        }
        
        //
        //this.componentMount();
      }
      
      // Typical usage (don't forget to compare props):
      if(prevProps.updateMessage !== this.props.updateMessage && !this.exitUpadteMessage){
        if(this.props.updateMessage){
          //console.log("Trueeeee",this.props.title);
          this.exitUpadteMessage = true;
          this.componentMount();
        }
      }

      
      if (this.state.resultsFetched !== prevState.resultsFetched && this.state.resultsFetched) {
        //console.log("this states results fetched---",this.state.resultsFetched);
        //console.log("COMP UPDATE______",this.props.title,this._Result.length == this._length,this.exitUpdate)
        if(this._Result.length == this._length && !this.exitUpdate){
        this.exitUpdate = true
        //console.log("COMPONENT DID UPDATE______",this.props.title,this._Result.length,this._length)
        if(this._Result.length == this._length){
          for(var k = 0;k<this._Result.length;k++){
                      try{
                        //console.log("Check editable,,,",this._Result[k])
                            if(this._Result[k].processesData[0].check_editable){
                              //console.log("instance-----",this._Result[k].processesData[0]);
                              var p = this._Result[k].processesData[0].instance;
                              this.progress[p] = this.progress[p]+1;
                              this.netProgress[p] = this.progress[p]/this.processCount[p];
                              if(this.netProgress[p]==1 && this._Result[k].processesData[0].check_editable.processCleared){
                                if(this.colorValue[p] != this.red ){
                                  this.colorValue[p] = this.green 
                                  this.iconValue[p] = this.check;
                                  this.lock[p+1] = false;
                                  this.setState((state) => {
                                    return {updateMessage: state.updateMessage + 1};
                                  });
                                 // setUpdateMessage(prevCount => prevCount + 1);
                                }   
                              }
                              if(this.netProgress[p]>0 && this.netProgress[p]<1){
                                if(this.colorValue[p] != this.red ){
                                  this.colorValue[p] = this.orange;
                                  this.iconValue[p] = this.minusBox;
                                }
                              }
                              if(!this._Result[k].processesData[0].check_editable.processCleared){
                                this.colorValue[p] = this.red 
                                this.iconValue[p] = this.alert
                                this.lock[p+1] = true;
                              }
                              
                            }
                            this.setState((state) => {
                              return {refresh: state.refresh + 1};
                            });
                            //setRefresh(prevCount => prevCount + 1);
                          }
                          catch{

                          }

            
          }
          //console.log("COLOR VALUE___",colorValue);
          //console.log("INDEX---",netProgress);
          this.setState({headerColor: this.colorValue[this.netProgress.length-1]})
          this.setState({headerIcon: this.iconValue[this.netProgress.length-1]})
          
          //setHeaderColor(colorValue[netProgress.length-1]);
          //setHeaderIcon(iconValue[netProgress.length-1]);
          this.setHeaderText();
          
        }
      }
      }
    }

    setHeaderText (){
      //console.log(this.colorValue,this.props.title);
      switch(this.colorValue[this.netProgress.length-1]){
        
        case this.red:
          //console.log("RED")
          if(this.netProgress.length<=this.preSurgeryProcessCount){
            this.setState({message: "Not Cleared for start of day"})
            //setMessage("Not Cleared for start of day");
          }else if(this.netProgress.length == this.processCount.length){
            this.setState({message: "Not Cleared for end of day"})
            //setMessage("Not Cleared for end of day");
          }else{
            var temp = "Not Cleared for surgery -0"+(this.netProgress.length-this.preSurgeryProcessCount)
            for(var i = 0; i<this.checkPoint.length;i++){
                
                if(this.netProgress.length<=this.checkPoint[i]){
                  this.setState({message: "Not Cleared for surgery -0"+(this.checkPoint[i]-1)/2})
                  //setMessage("Not Cleared for surgery -0"+(checkPoint[i]-1)/2);
                  return;
                }
            }
          }
          break;
        case this.orange:
          //console.log("ORANGE")
          
          if(this.netProgress.length<=this.preSurgeryProcessCount){
            this.setState({message: "Ongoing for start of day"})
            //setMessage("Ongoing for start of day");
          }else if(this.netProgress.length == this.processCount.length){
            this.setState({message: "Ongoing end of day"})
            //setMessage("Ongoing end of day");
          }else{
            //var temp = "Ongoing for surgery -0"+(netProgress.length-preSurgeryProcessCount)
            for(var i = 0; i<this.checkPoint.length;i++){
                
                if(this.netProgress.length<=this.checkPoint[i]){
                  this.setState({message: "Ongoing for surgery -0"+(this.checkPoint[i]-1)/2})
                  //setMessage("Ongoing for surgery -0"+(checkPoint[i]-1)/2);
                  return;
                }
            }
            //setMessage(temp);
          }
          break;
        case this.green:
          //console.log("GREEN")
          if(this.netProgress.length<this.preSurgeryProcessCount){
            //setHeaderColor(orange);
            //setHeaderIcon(minusBox);
            this.setState({headerColor: this.orange})
            this.setState({headerIcon: this.minusBox})
            this.setState({message: "Ongoing for start of day"})
            //setMessage("Ongoing for start of day");
            break;
          }
          
          if(this.netProgress.length == this.preSurgeryProcessCount){
            if(!this.state.autoClaveCleared){
              this.lock[this.preSurgeryProcessCount] = true;
              this.setState({headerColor: this.red})
              this.setState({headerIcon: this.minusBox})
              //setHeaderColor(red);
              //setHeaderIcon(minusBox);
              this.setState({message: "AutoClave not cleared"})
              //setMessage("AutoClave not cleared");
            }else{
              this.setState({message: "Cleared for start of day"})
              //setMessage("Cleared for start of day");
            }
          }else if(this.netProgress.length == this.processCount.length){
            this.setState({message: "Cleared for end of day"})
            //setMessage("Cleared for end of day");
          }else{
            for(var i = 0; i<this.checkPoint.length;i++){
              
              if(this.netProgress.length<this.checkPoint[i]){
                this.setState({headerColor: this.orange})
                this.setState({headerIcon: this.minusBox})
                //setHeaderColor(orange);
                //setHeaderIcon(minusBox);
                this.setState({message: "Ongoing for surgery -0"+(this.checkPoint[i]-1)/2})
                //setMessage("Ongoing for surgery -0"+(checkPoint[i]-1)/2);
                return;
              }
              if(this.netProgress.length==this.checkPoint[i]){
                this.setState({message: "Cleared for surgery -0"+(this.checkPoint[i]-1)/2})
                //setMessage("Cleared for surgery -0"+(checkPoint[i]-1)/2);
                return;
              }
            }
          }
          break;
      }
      
    }

    render() {
        return(
            <TouchableOpacity
            onPress={this.props.onPress}
            style={{backgroundColor:'#fff',borderRadius:8 ,justifyContent:'center',padding:20,elevation:6,zIndex:2}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <Text style={{fontSize:18,color:'#000',fontWeight:'bold'}}>{this.props.title}</Text>
            <MaterialCommunityIcons name="arrow-right" size={18} />
            </View>
            {this.props.message && this.props.operationTheaterID ==null?(
                    <MessageComponent message={this.props.message}/>
            ):
            (this.state.message ? (<View style={{flexDirection:'row',alignItems:'center'}}>
              <MaterialCommunityIcons name={this.state.headerIcon} size={19} color={this.state.headerColor}/>
              <Text style={{marginLeft:8,fontSize:16,color:this.state.headerColor}}>{this.state.message}</Text>
            </View>):<></>)}
            </TouchableOpacity>
        )
    }
    
}
export default OTCard;