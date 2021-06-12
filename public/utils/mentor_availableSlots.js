// object to be updated/sent after booking is matched
let availableSlotsForTheMonth = {
  "1 Jan": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2 Jan": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "3 Jan": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
};

// all booking in January
let bookingForTheMonthJan = [
  {
    date: "1 Jan",
    bookings: [
      { name: "Chelsea", timeslot: "9am-11am" },
      { name: "Chelsea", timeslot: "1pm-3pm" },
      { name: "Chelsea", timeslot: "4pm-6pm" },
    ],
  },
  {
    date: "2 Jan",
    bookings: [{ name: "Chelsea", timeslot: "1pm-3pm" }],
  },
  {
    date: "3 Jan",
    bookings: [
      { name: "Chelsea", timeslot: "9am-11am" },
      { name: "Min Shan", timeslot: "4pm-6pm" },
    ],
  },
];

// to change the true/false in each timeslot
function getAvailableSlots(arr) {
  var reference = {
    "9am-11am": false,
    "1pm-3pm": false,
    "4pm-6pm": false,
    "7pm-9pm": false,
  };
  arr.forEach(booking => (reference[booking.timeslot] = true));
  // console.log(reference);

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
    availableSlotsForTheMonth[day.date] = openTimeSlot;
  });
  return availableSlotsForTheMonth;
};

/* ================================== */
/* ======== Start the Flow  ========= */
/* ================================== */

function startingProcess() {
  return new Promise((resolve, reject) => {
    return resolve("Starting process..");
  });
}

startingProcess()
  .then(res => {
    console.log(res);
    console.log("====================");
    return getAvailableSlotsForTheMonth(bookingForTheMonthJan);
  })
  .then(res => {
    console.log("Available slots left:");
    console.log(res);
    console.log("====================");
    console.log("response is sent");
    return;
  })
  .catch(err => {
    console.log(err);
  });
