const { UserModel } = require("../models/user_model");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");

module.exports = {
  registerForm: (req, res) => {
    res.render("users/register.ejs");
  },
  registerUser: async (req, res) => {
    /* ===== validating user, pw matches, email ===== */
    if (!req.body.full_name) {
      res.redirect("/beautylash/users/register");
      console.log(1);
      return;
    }
    if (!req.body.email || !req.body.password) {
      res.redirect("/beautylash/users/register");
      //message: error
      console.log(2);
      return;
    }
    if (req.body.password !== req.body.password_confirm) {
      res.redirect("/beautylash/users/register");
      // error message
      console.log(3);
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
      res.redirect("/beautylash/users/login");
      // error message
      console.log(5);
      return;
    }
    /* ===== validation end ===== */

    /* ===== Create Salted + hashed password ===== */
    const timestampNow = moment().utc();
    const salt = uuidv4();
    const saltedPassword = salt + req.body.password;

    const hashConverter = createHash("sha256");
    hashConverter.update(saltedPassword);
    console.log(6);
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
      res.redirect("/beautylash/users/register");
      return;
    }
    // everything is correct and nicely done, and then directed to dashboard
    res.redirect("/beautylash/users/dashboard");
  },

  loginForm: (req, res) => {
    res.render("users/login.ejs");
  },
  loginUser: async (req, res) => {
    // validate if email or password is empty
    if (!req.body.email || !req.body.password) {
      // error message
      console.log(1);
      res.redirect("/beautylash/users/login");
    }
    // find user with email given
    let user = {};

    try {
      user = await UserModel.findOne({ email: req.body.email });
    } catch (err) {
      console.log(err);
      console.log(2);
      res.redirect("/beautylash/users/login");
      return;
    }

    if (!user) {
      res.redirect("/beautylash/users/login");
      // recommend to register new user
      console.log(3);
      return;
    }
    console.log(user);
    console.log("salt recorded: " + user.hash);
    // User is found, then create the hashed+salted with req.body.password
    const saltedPassword = user.pwsalt + req.body.password;
    const hashConverter = createHash("sha256");
    hashConverter.update(saltedPassword);
    const newHashedPassword = hashConverter.digest("hex");

    // compare database pw and req.body.password
    if (user.hash !== newHashedPassword) {
      res.redirect("/beautylash/users/login");
      // print error message
    }
    // everything is nicely correct, then set 'session' and directed to dashboard
    console.log("4 - all correct");
    req.session.user = user;
    res.redirect("/beautylash/users/dashboard");
  },
  dashboard: (req, res) => {
    res.render("users/dashboard.ejs");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/beautylash");
  },
};
