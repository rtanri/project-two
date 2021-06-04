const { customers, Post } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    res.render("products/index", { customers });
  },
  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
