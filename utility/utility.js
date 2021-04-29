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