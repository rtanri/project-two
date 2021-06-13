const { PostModel } = require("../models/post_model");
const { BookingModel } = require("../models/booking_model");
const moment = require("moment");
const _ = require("lodash");

module.exports = {
  index: (req, res) => {
    // available dates
    let timeslotOptions = ["9am - 11am", "1pm - 3pm", "4pm - 6pm", "7pm - 9pm"];
    console.log("Opening Index Homepage:");
    console.log(req.session.user);
    console.log("======================");
    res.render("products/index", {
      timeslotOptions,
    });
  },
  customers: async (req, res) => {
    // collect all postings
    const loginUser = req.session.user;
    let postings = [];

    try {
      postings = await PostModel.find();
    } catch (err) {
      res.statusCode(500);
      console.log("0 - error");
      return "Server error 500";
    }
    console.log(1);

    // const likedPhoto = req.body.liked;

    // if (likedPhoto || likedPhoto.length) {
    //   loginUser.liked_post.push(req.body.liked);
    // }

    res.render("products/customers", {
      postings: postings,
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
  // show: (req, res) => {
  //   PostModel.findOne({ _id: req.params.id })
  //     // prettier-ignore
  //     .then(item => {
  //       console.log("1 - success");
  //       console.log(item);

  //       if (!item) {
  //         console.log("2 - cannot find post");
  //         res.redirect("/beautylash/customers");
  //         return;
  //       }
  //       res.render("products/show", { item });
  //     })
  //     .catch(err => {
  //       console.log("3 - error");
  //       console.log(err);
  //       res.redirect("/beautylash/customers");
  //       return;
  //     });
  // },
  homepage: (req, res) => {
    res.render("products/homepage");
  },
};
