const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  formattedDate: { type: String },
  timeslot: { type: String, required: true },
  customer_email: { type: String, required: true },
  treatment: { type: String, required: true },
  created_at: { type: Date },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel: BookingModel,
};
