let getCalendarBooking = [
  {
    _id: "60c3f8656531fd1838de0070",
    date: "2021-06-23 T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:25.491Z",
    __v: 0,
  },
  {
    _id: "60c3f86e6531fd1838de0071",
    date: "2021-06-24 T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:34.516Z",
    __v: 0,
  },
];

let bookingForTheMonthJune = [
  {
    date: "2021-06-01",
    bookings: [{ name: "Jessica", timeslot: "9am - 11am" }],
  },
  {
    date: "2021-06-02",
    bookings: [
      { name: "Kim", timeslot: "1pm - 3pm" },
      { name: "Felly", timeslot: "4pm - 6pm" },
    ],
  },
  {
    date: "2021-06-03",
    bookings: [],
  },
  {
    date: "2021-06-04",
    bookings: [],
  },
  {
    date: "2021-06-05",
    bookings: [],
  },
  {
    date: "2021-06-22",
    bookings: [],
  },
  {
    date: "2021-06-23",
    bookings: [],
  },
  {
    date: "2021-06-24",
    bookings: [{ name: "Anna", timeslot: "1pm - 3pm" }],
  },
  {
    date: "2021-06-25",
    bookings: [],
  },
  {
    date: "2021-06-26",
    bookings: [],
  },
  {
    date: "2021-06-27",
    bookings: [],
  },
  {
    date: "2021-06-28",
    bookings: [],
  },
  {
    date: "2021-06-29",
    bookings: [],
  },
  {
    date: "2021-06-30",
    bookings: [],
  },
];

function changeDateFormat(arr) {
  arr.forEach(element => {
    const newDateFormat = element.date.slice(0, 10);
    return (element.date = newDateFormat);
  });
  //   console.log(arr);
  return arr;
}

function startFiltering() {
  return new Promise((resolve, reject) => {
    return resolve(getCalendarBooking);
  });
}

// prettier-ignore
startFiltering()
  // res is getCalendarBooking array
  .then(res => {
    console.log("==== 1st then ====")
    return changeDateFormat(res)
  })
  .then(res =>{
    console.log("==== 2nd then ====")

    for (const oneNewAppoinment of res){
      let obj = bookingForTheMonthJune.find(element => element.date === oneNewAppoinment.date)
      console.log(obj)
      if (oneNewAppoinment.timeslot === obj.booking.timeslot) {
        //  if yes, then cancel the booking and tell user the date has been booked
        console.log("Sorry, the date and time has been booked");
        // delete from array: getCalendarBooking
        // delete data from mongoDB
        return;
      } 
    }

  })
  .catch(err => {
    console.log("==== catch ====")
    console.log(err)
  })
