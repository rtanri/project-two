const { BookingModel } = require("../models/booking_model");
const moment = require("moment");

module.exports = {
  calendarBooking: (req, res) => {
    const timestampNow = moment().utc();
    console.log(1);
    BookingModel.create({
      date: req.body.date,
      timeslot: req.body.timeslot,
      treatment: req.body.treatment,
      created_at: timestampNow,
    })
      .then(resp => {
        console.log(2);
        res.redirect("/beautylash/users/dashboard");
      })
      .catch(err => {
        console.log(3);
        console.log(err);
        res.redirect("/beautylash");
      });

    // let obj1 = { name: "hello world" };
    // res.send(obj1);
    // prepare data to render the calendar events
    // res.send() -> data will be in JSON format
  },
  calendarEvent: async (req, res) => {
    let bookingForTheMonthJune = [];
    try {
      bookingForTheMonthJune = await BookingModel.find();
    } catch (err) {
      res.statusCode(500);
      return "Server error 500";
    }
    // after we got all the booking data
    //     console.log(bookingForTheMonthJune);
    res.send(bookingForTheMonthJune);
  },
};
