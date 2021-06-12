let availableSlotsForTheMonth = {
  "2021-06-20": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-21": ["1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-22": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-23": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-24": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-25": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-26": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-27": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-28": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-29": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-30": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
};

//
//
//

let getBookingData = [
  {
    _id: "60c3f8656531fd1838de0070",
    date: "2021-06-24T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:25.491Z",
    __v: 0,
  },
  {
    _id: "60c3f86e6531fd1838de0071",
    date: "2021-06-24T00:00:00.000Z",
    timeslot: "4pm - 6pm",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:34.516Z",
    __v: 0,
  },
  {
    _id: "60c3f8786531fd1838de0072",
    date: "2021-06-26T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "russian volume",
    created_at: "2021-06-11T23:57:44.978Z",
    __v: 0,
  },
  {
    _id: "60c3f8806531fd1838de0073",
    date: "2021-06-26T00:00:00.000Z",
    timeslot: "4pm - 6pm",
    treatment: "russian volume",
    created_at: "2021-06-11T23:57:52.653Z",
    __v: 0,
  },
  {
    _id: "60c3f8876531fd1838de0074",
    date: "2021-06-27T00:00:00.000Z",
    timeslot: "7pm - 9pm",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:59.860Z",
    __v: 0,
  },
  {
    _id: "60c446c7ff5cf2326ff90b4f",
    date: "2021-06-24T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "lashlift",
    created_at: "2021-06-12T05:31:51.014Z",
    __v: 0,
  },
];

//
//
//
function changeDateFormat(arr) {
  arr.forEach(element => {
    const newDateFormat = element.date.slice(0, 10);
    element.date = newDateFormat;
  });
  return arr;
}
// to change the true/false in each timeslot
function getAvailableSlots(arr) {
  var reference = {
    "9am-11am": false,
    "1pm-3pm": false,
    "4pm-6pm": false,
    "7pm-9pm": false,
  };
  arr.forEach(booking => (reference[booking.timeslot] = true));
  // true value artinya sudah ter-booking

  const availableSlots = [];

  for (timeslot in reference) {
    if (!reference[timeslot]) availableSlots.push(timeslot);
  }
  // console.log(availableSlots)
  return availableSlots;
}

const getAvailableSlotsForTheMonth = arr => {
  let availableSlotsForTheMonth = {};

  arr.forEach(day => {
    // console.log(day.date);
    // console.log(day.bookings);

    // to update each value of date "1 Jan" and other within availableSlotsForTheMonth
    let openTimeSlot = getAvailableSlots(day.bookings);
    // console.log(openTimeSlot);
    availableSlotsForTheMonth[day.date] = openTimeSlot; //untuk render availableSlotsForTheMonth value array nya
  });
  return availableSlotsForTheMonth;
};

//
//
//
// {
//   _id: "60c3f8656531fd1838de0070",
//   date: "2021-06-23T00:00:00.000Z",
//   timeslot: "9am - 11am",
//   treatment: "lashlift",
//   created_at: "2021-06-11T23:57:25.491Z",
//   __v: 0,
// },
function creatingMiddleObj(arr) {
  const formatedDateArr = changeDateFormat(arr);
  let newArr = [];

  for (const element of formatedDateArr) {
    if (!newArr[element.date]) {
      const newObject1 = {
        date: element.date,
        bookings: [
          {
            name: "customer new day",
            timeslot: element.timeslot,
          },
        ],
      };
      newArr.push(newObject1);
      return newArr;
    } else {
      const newObject2 = {
        name: "customer",
        timeslot: element.timeslot,
      };
      let obj = newArr.find(o => o.date === element.date);
      obj.bookings.push(newObject2);
    }
  }
  return newArr;
}

function renderTimeslots() {
  const getDate = document.getElementByClassName("date-selection").value;
  if (!getDate || !getDate.length) {
    console.log("Select date");
  }
  console.log(availableSlotsForTheMonth[getDate]);
}
renderTimeslots();
