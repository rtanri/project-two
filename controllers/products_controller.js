const { customers, Post } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    res.render("products/index", { customers });
  },
  customers: (req, res) => {
    res.render("products/customers", { customers });
  },
  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
