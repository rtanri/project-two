document.addEventListener("DOMContentLoaded", async function () {
  // additional step: do ajax call to product_controller.js (calendar)
  // once response return, then we no things below
  let var1 = await fetch("/calendar").then(response => response.json());
  // .then(data => console.log(data))
  // .catch(err => console.log(err));
  console.log(var1);
  calendarSetup();
});

function calendarSetup() {
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
}
