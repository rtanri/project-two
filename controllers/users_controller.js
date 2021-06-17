const { UserModel } = require("../models/user_model");
const { PostModel } = require("../models/post_model");
const { BookingModel } = require("../models/booking_model");

const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");

module.exports = {
  combinedForm: async (req, res) => {
    const messages = await req.consumeFlash("error");
    console.log(messages);
    res.render("users/combined_login_register.ejs", {
      messages: messages,
    });
  },
  registerUser: async (req, res) => {
    /* ===== validating user, pw matches, email ===== */
    if (!req.body.full_name) {
      await req.flash("error", "Fail to register, 'Full Name' is empty");
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }
    if (!req.body.email || !req.body.password) {
      await req.flash("error", "Fail to register, email or password is empty");
      res.redirect("/beautylash/users/user-sign-in");
      eturn;
    }
    if (req.body.password !== req.body.password_confirm) {
      await req.flash("error", "Fail to register, password did not match");
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }

    let user = null;

    try {
      user = await UserModel.findOne({ email: req.body.email });
    } catch (err) {
      console.log(4);
      console.log(`Finding user... ${err}`);
      res.redirect("/beautylash/users/register");
      return;
    }
    if (user) {
      await req.flash("error", "Fail to register, email has been registered");
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }
    /* ===== validation end ===== */

    /* ===== Create Salted + hashed password ===== */
    const timestampNow = moment().utc();
    const salt = uuidv4();
    const saltedPassword = salt + req.body.password;

    const hashConverter = createHash("sha256");
    hashConverter.update(saltedPassword);

    try {
      await UserModel.create({
        full_name: req.body.full_name,
        email: req.body.email,
        pwsalt: salt,
        hash: hashConverter.digest("hex"),
        created_at: timestampNow,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }
    await req.flash("error", "Registration is succesful");
    res.redirect("/beautylash/users/user-sign-in");
    return;
  },

  loginUser: async (req, res) => {
    // validate if email or password is empty
    if (!req.body.login_email || !req.body.login_password) {
      await req.flash(
        "error",
        "Fail to login, please fill-in email and password"
      );
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }
    // find user with email given
    let user = {};

    try {
      user = await UserModel.findOne({ email: req.body.login_email });
    } catch (err) {
      await req.flash("error", err);
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }

    if (!user) {
      await req.flash("error", "Fail to login, email is not registered");
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }
    console.log(user);
    console.log("salt recorded: " + user.hash);
    // User is found, then create the hashed+salted with req.body.password
    const saltedPassword = user.pwsalt + req.body.login_password;
    const hashConverter = createHash("sha256");
    hashConverter.update(saltedPassword);
    const newHashedPassword = hashConverter.digest("hex");

    // compare database pw and req.body.password
    if (user.hash !== newHashedPassword) {
      await req.flash("error", "Fail to login, wrong password");
      res.redirect("/beautylash/users/user-sign-in");
      return;
    }

    req.session.user = user;
    res.redirect("/beautylash/users/dashboard");
    return;
  },
  dashboard: async (req, res) => {
    const loginUser = await UserModel.findOne({
      email: req.session.user.email,
    });

    let allBookings = [];

    try {
      allBookings = await BookingModel.find({
        customer_email: loginUser.email,
      }).sort({ date: 1 });
    } catch (err) {
      res.statusCode(500);
      console.log("cannot find any booking");
      return "Server error 500";
    }

    allBookings.forEach(element => {
      const dateInMoment = moment(element.date);
      const newFormat = dateInMoment.format("DD/MM/YYYY");
      element.formattedDate = newFormat;
      return;
    });
    console.log(loginUser);

    res.render("users/dashboard.ejs", { allBookings, loginUser });
  },
  logout: (req, res) => {
    req.session.destroy();

    res.redirect("/beautylash");
  },

  edit: (req, res) => {
    loginUser = req.session.user;

    res.render("users/edit_profile.ejs", { loginUser });
  },
  update: (req, res) => {
    loginUser = req.session.user;

    UserModel.updateOne(
      { email: loginUser.email },
      {
        $set: {
          full_name: req.body.name,
          address: req.body.address,
          postal: req.body.postal,
          phone: req.body.phone,
        },
      }
    )
      .then(updateResp => {
        console.log(loginUser);
        res.redirect("/beautylash/users/dashboard");
      })
      .catch(err => {
        res.redirect("/beautylash/users/<%= loginUser._id %>/edit");
      });
  },
};

// registerForm: (req, res) => {
//   res.render("users/register.ejs");
// },
// loginForm: (req, res) => {
//   res.render("users/login.ejs");
// },
