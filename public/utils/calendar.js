document.addEventListener("DOMContentLoaded", async function () {
  // additional step: do ajax call to product_controller.js (calendar)
  // once response return, then we no things below
  // prettier-ignore
  let getBookingData = await fetch("/calendar-event")
  .then(response => response.json())
  .catch(err => console.log(err))

  // console.log(typeof getBookingData);
  // console.log(getBookingData);

  calendarRender(eventList);
});

/* ========================================== */
/* ======== Calendar Booking setup  ========= */
/* ========================================== */

let availableSlotsForTheMonth = {
  "2021-06-01": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-02": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-03": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-04": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-05": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-06": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-07": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-08": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-09": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-10": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-11": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-12": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-13": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-14": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-15": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-16": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-17": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-18": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-19": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-20": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-21": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
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

let bookingForTheMonthJune = [
  {
    date: "2021-06-01",
    bookings: [{ name: "Jessica", timeslot: "9am-11am" }],
  },
  {
    date: "2021-06-02",
    bookings: [
      { name: "Kim", timeslot: "1pm-3pm" },
      { name: "Felly", timeslot: "4pm-6pm" },
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

/* ============================================= */
/* ======== Calendar Render and Event  ========= */
/* ============================================= */

function calendarRender(dataset) {
  // this id: calendar -
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "local",
    initialView: "dayGridMonth",
    selectable: true,
    height: 450,
    aspectRatio: 1,
    dateClick: function (info) {
      const dateSelected = document.querySelectorAll("date-selected");
      dateSelected.innerText = info.dateStr;

      const dateSelection = document.querySelectorAll(".date-selection");
      dateSelection.forEach(item => item.setAttribute("value", info.dateStr));
    },
    events: dataset,
  });
  calendar.render();
}

function addEvent() {
  calendar.addEvent(event, [, source]);
}

let eventList = [
  {
    title: "Full",
    start: "2021-06-06",
    display: "background",
    color: "red",
  },
  {
    title: "Full",
    start: "2021-06-09",
    display: "background",
    color: "red",
  },
  {
    title: "Full",
    start: "2021-06-10",
    display: "background",
    color: "red",
  },
  {
    title: "Full",
    start: "2021-06-11",
    display: "background",
    color: "red",
  },
  {
    title: "Full",
    start: "2021-06-14",
    display: "background",
    color: "red",
  },
  {
    title: "1 left",
    start: "2021-06-15",
  },
  {
    title: "1 left",
    start: "2021-06-16",
  },
  {
    title: "5 left",
    start: "2021-06-19",
  },
  {
    title: "4 left",
    start: "2021-06-20",
  },
];
