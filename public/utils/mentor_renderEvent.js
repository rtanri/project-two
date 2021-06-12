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
  {
    _id: "60c3f86e6531fd1838de0071",
    date: "2021-06-24 T00:00:00.000Z",
    timeslot: "9am - 11am",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:34.516Z",
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
  {
    _id: "60c3f86e6531fd1838de0071",
    date: "2021-06-24 T00:00:00.000Z",
    timeslot: "1pm - 3pm",
    treatment: "lashlift",
    created_at: "2021-06-11T23:57:34.516Z",
    __v: 0,
  },
];

function creatingNewObj(arr) {
  const formatedDateArr = changeDateFormat(arr);
  let newObj = {};

  for (const element of formatedDateArr) {
    if (!newObj[element.date]) {
      newObj[element.date] = 0;
    }
    newObj[element.date]++;
    // element.date : element.timeslot
  }
  return newObj;
}

const totalNumOfBooking = creatingNewObj(getCalendarBooking);
// { '2021-06-23': 1, '2021-06-24': 2 }
console.log(createEventList(totalNumOfBooking));

function createEventList(obj) {
  let eventListArr = [];
  for (const date in obj) {
    const newObject = {
      title: renderTitle(obj[date]),
      start: date,
      display: obj[date] === 4 ? "background" : "",
      color: obj[date] === 4 ? "red" : "",
    };
    eventListArr.push(newObject);
  }
  return eventListArr;
}

function renderTitle(num) {
  if (num === 4) {
    return "full";
  } else {
    return 4 - num + " left";
  }
}

function changeDateFormat(arr) {
  arr.forEach(element => {
    const newDateFormat = element.date.slice(0, 10);
    element.date = newDateFormat;
  });
  return arr;
}

// let eventList = [
//   {
//     title: "Full",
//     start: "2021-06-06",
//     display: "background",
//     color: "red",
//   },
//   {
//     title: "Full",
//     start: "2021-06-09",
//     display: "background",
//     color: "red",
//   },
//   {
//     title: "Full",
//     start: "2021-06-10",
//     display: "background",
//     color: "red",
//   },
//   {
//     title: "Full",
//     start: "2021-06-11",
//     display: "background",
//     color: "red",
//   },
//   {
//     title: "Full",
//     start: "2021-06-14",
//     display: "background",
//     color: "red",
//   },
//   {
//     title: "1 left",
//     start: "2021-06-15",
//   },
//   {
//     title: "1 left",
//     start: "2021-06-16",
//   },
//   {
//     title: "5 left",
//     start: "2021-06-19",
//   },
//   {
//     title: "4 left",
//     start: "2021-06-20",
//     display: "",
//     color: "",
//   },
// ];
