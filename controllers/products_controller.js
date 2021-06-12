const { PostModel } = require("../models/post_model");
const moment = require("moment");
// const { customers, Posting } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    // available dates
    let timeslotOptions = ["9am - 11am", "1pm - 3pm", "4pm - 6pm", "7pm - 9pm"];
    let availableSlotsForTheMonth;

    res.render("products/index", {
      timeslotOptions,
      availableSlotsForTheMonth,
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

let availableSlotsForTheMonth = {
  "2021-06-01": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-02": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-03": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-04": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-05": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-06": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-07": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-08": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-09": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-10": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-11": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-12": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-13": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-14": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-15": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-16": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-17": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-18": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-19": ["1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-20": ["1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-21": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-22": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-23": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-24": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-25": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-26": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-27": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-28": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-29": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
  "2021-06-30": ["9am-11am", "1pm-3pm", "4pm-6pm", "7pm-9pm"],
};
