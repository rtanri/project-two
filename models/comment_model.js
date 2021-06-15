const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  post_id: { type: String, required: true },
  comment_content: { type: String },
  like: { type: Boolean },
});

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = {
  CommentModel: CommentModel,
};
