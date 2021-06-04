const { customers, Posting } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    res.render("products/index", { customers });
  },
  customers: (req, res) => {
    res.render("products/customers", { customers });
  },
  newPost: (req, res) => {
    res.render("products/new");
    console.log(1);
  },
  createPost: (req, res) => {
    console.log(req.body);
    const newEntry = new Posting(
      req.body.customerName,
      req.body.serviceName,
      req.body.category,
      req.body.image,
      customers.length
    );
    customers.push(newEntry);
    res.redirect("/beautylash/customers");
  },

  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
