const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  service: { type: String, required: true, trim: true },
  category: { type: String },
  image: { type: String, required: true, unique: true, trim: true },
  created_at: { type: Date },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel: PostModel,
};
