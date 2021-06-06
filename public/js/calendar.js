document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [
      {
        title: "Busy",
        start: "2021-06-06",
      },
      {
        title: "Busy",
        start: "2021-06-07T10:30",
      },
      {
        title: "Busy",
        start: "2021-06-09T15:00:00",
      },
    ],
    height: 500,
    aspectRatio: 1,
  });
  calendar.render();
});
