const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 50 },
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
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel: UserModel,
};
