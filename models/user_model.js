const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, max: 100, trim: true },
  email: { type: String, required: true, unique: true, max: 50, trim: true },
  pwsalt: { type: String },
  hash: { type: String, required: true },
  addresses: [
    {
      postal: {
        type: String,
      },
      area: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],
  created_at: { type: Date },
  liked_post: [{ type: String }],
  upcoming_booking: [{ type: Date }],
  past_booking: [{ type: Date }],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel: UserModel,
};
