const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { tye: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 50 },
  pwsalt: { type: String },
  hash: { type: String, required: true },
  addresses: [
    {
      postal: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: { type: Date },
  liked_post: [{ type: String }],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel: UserModel,
};
