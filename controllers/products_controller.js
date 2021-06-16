const { PostModel } = require("../models/post_model");
const { BookingModel } = require("../models/booking_model");
const { CategoryModel } = require("../models/category_model");
const moment = require("moment");
const _ = require("lodash");

module.exports = {
  index: async (req, res) => {
    // available dates
    let timeslotOptions = ["9am - 11am", "1pm - 3pm", "4pm - 6pm", "7pm - 9pm"];
    console.log("Opening Index Homepage:");
    console.log(req.session.user);
    console.log("======================");

    let postings = [];

    try {
      postings = await PostModel.find().sort({ created_at: -1 });
    } catch (err) {
      res.statusCode(500);
      console.log("0 - error");
      return "Server error 500";
    }

    res.render("products/index", {
      timeslotOptions,
      postings,
    });
  },
  customers: async (req, res) => {
    let postings = [];

    try {
      postings = await PostModel.find().sort({ created_at: -1 });
    } catch (err) {
      res.statusCode(500);
      console.log("0 - error");
      return "Server error 500";
    }

    res.render("products/customers", {
      postings: postings,
    });
  },
  customersWithFilter: async (req, res) => {
    let filter = req.body.category;

    if (filter === "Show All") {
      res.redirect("/beautylash/customers");
      return;
    }
    try {
      newPostings = await PostModel.find({ category: filter }).sort({
        created_at: -1,
      });
    } catch (err) {
      res.statusCode(500);
      console.log("0 - error");
      return "Server error 500";
    }
    res.render("products/customers", {
      postings: newPostings,
    });
  },
  createPost: (req, res) => {
    console.log(req.body);

    const timestampNow = moment().utc();
    console.log(1);
    createdSlug = _.kebabCase(req.body.service);
    PostModel.create({
      slug: createdSlug,
      name: req.body.name,
      service: req.body.service,
      category: req.body.category,
      image: req.body.image,
      created_at: timestampNow,
    })
      .then(createResp => {
        console.log("2 - Post successful");
        res.redirect("/beautylash/users/dashboard");
      })
      .catch(err => {
        console.log("3 - Post failed");
        console.log(err);
        res.redirect("/beautylash/users/dashboard");
      });
  },
  show: (req, res) => {
    let timeslotOptions = ["9am - 11am", "1pm - 3pm", "4pm - 6pm", "7pm - 9pm"];
    let item = {};
    let info = {};
    PostModel.findOne({ _id: req.params.id })
      // prettier-ignore
      .then(selectedItem => {
        console.log("1 - success");
        item = selectedItem;
        console.log(item);

        if (!selectedItem) {
          console.log("2 - cannot find post");
          res.redirect("/beautylash/customers");
          return;
        }

        CategoryModel.findOne({ category: item.category })
          .then(thisCategory => {
            console.log("3 - successful");
            info = thisCategory;
            console.log(info);

            res.render("products/show", { item, info, timeslotOptions });
          })
          .catch(err => {
            console.log("4.1. - error");
            console.log(err);
            res.redirect("/beautylash/customers");
            return;
          });
      })
      .catch(err => {
        console.log("4.2 - error");
        console.log(err);
        res.redirect("/beautylash/customers");
        return;
      });
  },
  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
