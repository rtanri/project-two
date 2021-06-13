const { BookingModel } = require("../models/booking_model");
const { UserModel } = require("../models/user_model");
const moment = require("moment");

module.exports = {
  calendarBooking: (req, res) => {
    const timestampNow = moment().utc();
    const loginUser = req.session.user;

    console.log(1);
    // validation
    BookingModel.find({
      date: req.body.date,
      timeslot: req.body.timeslot,
    }).then(resp => {
      // console.log(resp);
      if (!resp.length) {
        BookingModel.create({
          date: req.body.date,
          timeslot: req.body.timeslot,
          treatment: req.body.treatment,
          customer_email: loginUser.email,
          created_at: timestampNow,
        })
          .then(resp => {
            console.log(2);
            res.redirect("/beautylash/");
            return;
          })
          .catch(err => {
            console.log(3);
            console.log(err);
            res.redirect("/beautylash");
          });
      } else {
        // find same date/time - do not create
        console.log("Date and time has been booked");
        res.redirect("/beautylash");
        return;
      }
    });
  },
  calendarEvent: async (req, res) => {
    let bookingForTheMonthJune = [];
    try {
      bookingForTheMonthJune = await BookingModel.find();
    } catch (err) {
      res.statusCode(500);
      return "Server error 500";
    }
    res.send(bookingForTheMonthJune);
  },
  deleteBooking: (req, res) => {
    BookingModel.deleteOne({ _id: req.body.bookingId })
      .then(resp => {
        res.redirect("/beautylash/users/dashboard");
        return;
      })
      .catch(err => {
        console.log(err);
        res.redirect("/beautylash/users/dashboard");
        return;
      });
  },
};
