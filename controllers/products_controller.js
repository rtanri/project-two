const { PostModel } = require("../models/post_model");
const moment = require("moment");
// const { customers, Posting } = require("../models/post_model");

module.exports = {
  index: (req, res) => {
    // available dates
    let timeslotOptions = [
      "9am to 10:30am",
      "11am to 12:30pm",
      "1pm to 2:30am",
      "3pm to 4:30am",
      "6:30pm to 8pm",
      "8:30pm to 10pm",
    ];
    res.render("products/index", { timeslotOptions });
  },
  calendar: (req, res) => {
    // prepare data to render the calendar events.
    // focus on current month
    // res.send() -> data will be in JSON format
    let obj1 = { name: "hello world" };
    res.send(obj1);
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
