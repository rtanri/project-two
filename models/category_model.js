const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  detail: { type: String, required: true },
  use_case: { type: String },
});

const CategoryModel = mongoose.model("categories", categorySchema);

module.exports = {
  CategoryModel: CategoryModel,
};
