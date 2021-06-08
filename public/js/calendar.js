document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: "2021-06-08",
    initialView: "dayGridMonth",
    selectable: true,
    dateClick: function (info) {
      alert("Date: " + info.dateStr);
      alert("Resource ID: " + info.resource.id);
    },
    events: [
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
        title: "2 left",
        start: "2021-06-17",
      },
      {
        title: "2 left",
        start: "2021-06-18",
      },
      {
        title: "5 left",
        start: "2021-06-19",
      },
      {
        title: "4 left",
        start: "2021-06-20",
      },
    ],
    height: 450,
    aspectRatio: 1,
  });
  calendar.render();
});

const timeslotOption = [
  "9am to 10:30am",
  "11am to 12:30pm",
  "1pm to 2:30am",
  "3pm to 4:30am",
  "6:30pm to 8pm",
  "8:30pm to 10pm",
];

function printTime() {
  let selectedTd = document.querySelector("#timeslot");
  selectedTd.innerText = timeslotOption[1];
}
