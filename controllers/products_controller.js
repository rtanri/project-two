const { PostModel } = require("../models/post_model");
const moment = require("moment");
// const { customers, Posting } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    // available dates
    let timeslotOptions = ["9am - 11am", "1pm - 3pm", "4pm - 6pm", "7pm - 9pm"];

    res.render("products/index", {
      timeslotOptions,
    });
  },
  customers: async (req, res) => {
    let postings = [];
    try {
      postings = await PostModel.find();
    } catch (err) {
      res.statusCode(500);
      return "Server error 500";
    }
    console.log(postings);
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
    console.log(1);
    PostModel.create({
      name: req.body.name,
      service: req.body.service,
      category: req.body.category,
      image: req.body.image,
      created_at: timestampNow,
    })
      .then(createResp => {
        console.log(2);
        res.redirect("/beautylash/customers");
      })
      .catch(err => {
        console.log(3);
        console.log(err);
        res.redirect("/beautylash/add-post");
      });
  },
  homepage: (req, res) => {
    res.render("products/homepage");
  },
  show: (req, res) => {
    PostModel.findOne({ image: req.params.image }).then(item => {
      console.log("success");

      if (!item) {
        res.redirect("/beautylash");
      }
      res
        .render("products/show", {
          item,
        })
        .catch(err => {
          console.log(err);
          res.redirect("/beautylash");
        });
    });
  },
};
