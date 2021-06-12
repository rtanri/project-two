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
    date: "2021-06-24",
    bookings: [{ name: "Anna", timeslot: "1pm - 3pm" }],
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

function filterBookings() {
  changeDateFormat(getCalendarBooking);

  for (const newBookingDay of getCalendarBooking) {
    // console.log(bookingDay); // bookingDay exists in object type

    bookingForTheMonthJune.forEach(existingBookingDay => {
      // console.log(existingDay); // existingDay exists in object type
      // if we cannot find the same date
      if (newBookingDay.date !== existingBookingDay.date) {
        console.log("nothing match");
        let newDay = {
          date: newBookingDay.date,
          bookings: [
            {
              name: "customer",
              timeslot: newBookingDay.timeslot,
            },
          ],
        };
        //   bookingForTheMonthJune.push(newDay);
        console.log("newDay");
        console.log(newDay);
        console.log("==============");
      }

      // if we can find the same date
      if (newBookingDay.date === existingBookingDay.date) {
        console.log("it is match");
        //find out if there is same booking,
        //   let eachBookingsInExistingDay = existingBookingDay.bookings;

        existingBookingDay.bookings.forEach(detail => {
          if (detail.timeslot === newBookingDay.timeslot) {
            //  if yes, then cancel the booking and tell user the date has been booked
            console.log("Sorry, the date and time has been booked");
            // delete from array: getCalendarBooking
            // delete data from mongoDB
            return;
          } else {
            //if not, then push the data
            let newBooking = {
              name: "customer",
              treatment: newBookingDay.treatment,
              timeslot: newBookingDay.timeslot,
            };
            existingBookingDay.bookings.push(newBooking);
            console.log(existingBookingDay.bookings);
            return;
          }
        });
      }
    });
  }
  //   console.log(bookingForTheMonthJune);
}

filterBookings();

/* Result"

[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `node scratchpad.js`
nothing match
newDay
{
  date: '2021-06-23',
  bookings: [ { name: 'customer', timeslot: '9am - 11am' } ]
}
==============
nothing match
newDay
{
  date: '2021-06-23',
  bookings: [ { name: 'customer', timeslot: '9am - 11am' } ]
}
==============
nothing match
newDay
{
  date: '2021-06-23',
  bookings: [ { name: 'customer', timeslot: '9am - 11am' } ]
}
==============
nothing match
newDay
{
  date: '2021-06-24',
  bookings: [ { name: 'customer', timeslot: '9am - 11am' } ]
}
==============
nothing match
newDay
{
  date: '2021-06-24',
  bookings: [ { name: 'customer', timeslot: '9am - 11am' } ]
}
==============
it is match
[
  { name: 'Anna', timeslot: '1pm - 3pm' },
  { name: 'customer', treatment: 'lashlift', timeslot: '9am - 11am' }
]
[nodemon] clean exit - waiting for changes before restart