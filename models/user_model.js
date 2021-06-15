const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, max: 100, trim: true },
  email: { type: String, required: true, unique: true, max: 50, trim: true },
  pwsalt: { type: String },
  hash: { type: String, required: true },
  created_at: { type: Date },
  contact_number: { type: String },
  address: { type: String },
  postal_code: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel: UserModel,
};
