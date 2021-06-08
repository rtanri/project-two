const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeslot: { type: String, required: true, unique: true },
  customer_email: { type: String, required: true },
  created_at: { type: Date },
  treatments: { type: String, required: true },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel: BookingModel,
};
