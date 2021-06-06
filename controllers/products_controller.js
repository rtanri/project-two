const { PostModel } = require("../models/post_model");
const moment = require("moment");
// const { customers, Posting } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    res.render("products/index");
  },
  customers: async (req, res) => {
    let postings = [];
    try {
      postings = await PostModel.find();
    } catch (err) {
      res.statusCode(500);
      return "Server error 500";
    }
    res.render("products/customers", {
      postings: postings,
    });
  },
  newPost: (req, res) => {
    res.render("products/new");
  },
  createPost: (req, res) => {
    console.log(req.body);

    const timestampNow = moment().utc();

    PostModel.create({
      name: req.body.name,
      service: req.body.name,
      category: req.body.category,
      image: req.body.image,
      created_at: timestampNow,
    })
      .then(createResp => {
        res.redirect("/beautylash/customers");
      })
      .catch(err => {
        console.log(err);
        res.redirect("/beautylash/add-post");
      });
  },

  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
