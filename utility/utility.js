export const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  export const monthsFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
export const getMonthText = (date) => {
    let date_temp = new Date(date);
    let month = date_temp.getMonth();
    return months[month];
  };
  export const getDate = (date) => {
    let date_temp = new Date(date);
    let day = date_temp.getDate();
    let month = getMonthText(date_temp);
    let year = date_temp.getFullYear();
    let complete_date = day + "-" + month + "-" + year;
    return complete_date;
  };
  export const getPrevSevenDays=(date, prevDateVal)=>{
    var date = new Date(date);
    var yesterday = new Date(date.getTime() -( 24*60*60*1000*prevDateVal));
    return yesterday;
  }
  export const getTime =(date)=>{
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let hh = "";
      let mm="";
      let meridian = "AM";
      if(hours >12){
        hh=Math.floor(hours/2);
        meridian = "PM"
      } 
       if(hh<10){
        hh = "0"+hh;
      }else{
        hh =hh;
      }
      console.log("hours is ",hh);
      if(minutes<10){
          mm = "0"+minutes
      }else{
        mm= minutes;
      }
      console.log("hours is ",hh+":"+mm+meridian);
      //return (hh+":"+mm+meridian)
      return (hh+":"+mm)
  }