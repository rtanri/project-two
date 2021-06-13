/* =================================== */
/* ======== Collecting data  ========= */
/* =================================== */

document.addEventListener("DOMContentLoaded", async function () {
  let getBookingData = await fetch("/calendar-event")
    .then(response => response.json())
    .catch(err => console.log(err));

  const totalNumOfBooking = creatingNewObj(getBookingData);
  const eventList = createEventList(totalNumOfBooking);
  const dateMap = createDateMap(getBookingData);

  calendarRender(eventList, dateMap);
});

function changeDateFormat(arr) {
  arr.forEach(element => {
    const newDateFormat = element.date.slice(0, 10);
    element.date = newDateFormat;
  });
  return arr;
}

function createDateMap(getBookingData) {
  const dateMap = new Map();
  getBookingData.forEach(booking => {
    if (!dateMap.has(booking.date)) {
      dateMap.set(booking.date, [booking.timeslot]);
    } else {
      dateMap.get(booking.date).push(booking.timeslot);
    }
  });
  return dateMap;
}

function creatingNewObj(arr) {
  const formatedDateArr = changeDateFormat(arr);
  let newObj = {};

  for (const element of formatedDateArr) {
    if (!newObj[element.date]) {
      newObj[element.date] = 0;
    }
    newObj[element.date]++;
  }
  return newObj;
  // { '2021-06-23': 1, '2021-06-24': 2 }
}

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

/* ============================================= */
/* ======== Calendar Render and Event  ========= */
/* ============================================= */

function calendarRender(dataset, dateMap) {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "local",
    initialView: "dayGridMonth",
    selectable: true,
    height: 450,
    aspectRatio: 1,
    // click listener
    dateClick: function (info) {
      // console.log(info) // print an event detail
      const dateSelected = document.getElementById("date-selected");
      dateSelected.innerText = info.dateStr;

      const submitButton = document.querySelectorAll(".timeslot-submit");
      // console.log(submitButton);

      const dropdownOption = document.querySelectorAll(".treatment-dropdown");
      const availability = document.querySelectorAll(".not-available");
      const loginLink = document.querySelectorAll(".ask-to-login");

      submitButton.forEach(button => {
        replaceClass(
          button,
          "btn btn-success timeslot-submit",
          "btn btn-secondary timeslot-submit",
          dateMap,
          info
        );
      });
      dropdownOption.forEach(dropdown => {
        replaceClass(
          dropdown,
          "form-select calendar-input-size treatment-dropdown",
          "d-none treatment-dropdown",
          dateMap,
          info
        );
      });
      availability.forEach(message => {
        replaceClass(
          message,
          "not-available d-none",
          "not-available form-control-plaintext timeslot-option",
          dateMap,
          info
        );
      });
      loginLink.forEach(link => {
        replaceClass(
          link,
          "ask-to-login",
          "ask-to-login d-none",
          dateMap,
          info
        );
      });

      const dateSelection = document.querySelectorAll(".date-selection");
      dateSelection.forEach(item => item.setAttribute("value", info.dateStr));
    },
    events: dataset,
  });
  calendar.render();
}

const replaceClass = (element, existingClass, newClass, dateMap, info) => {
  const hasTakenTimeslots = dateMap.has(info.dateStr);
  console.log(
    element.id,
    hasTakenTimeslots,
    info.dateStr,
    dateMap.get(info.dateStr)
  );
  if (!hasTakenTimeslots || !dateMap.get(info.dateStr).includes(element.id)) {
    element.disabled = false;
    element.setAttribute("class", existingClass);
  } else {
    element.disabled = true;
    element.setAttribute("class", newClass);
  }
};

/* ========================================== */
/* ======== Calendar Booking setup  ========= */
/* ========================================== */

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
