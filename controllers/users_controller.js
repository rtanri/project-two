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
      //message: error
      return;
    }
    if (!req.body.email || !req.body.password) {
      res.redirect("/beautylash/users/register");
      //message: error
      return;
    }
    if (req.body.password !== req.body.password_confirm) {
      res.redirect("/beautylash/users/register");
      // error message
      return;
    }

    let user = null;

    try {
      user = await UserModel.findOne({ email: req.body.email });
    } catch (err) {
      console.log(`Finding user... ${err}`);
      res.redirect("/beautylash/users/register");
      return;
    }
    if (user) {
      res.redirect("/beautylash/users/register");
      // error message
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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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
    res.render("/beautylash/users/login.ejs");
  },
  loginUser: async (req, res) => {
    // validate if email or password is empty
    if (!req.body.email || !req.body.password) {
      // error message
      res.redirect("/beautylash/users/login");
    }
    // find user with email given
    let user = null;

    try {
      user = await UserModel.find.apply({ email: req.body.email });
    } catch (err) {
      console.log(err);
      res.redirect("/beautylash/users/login");
      return;
    }

    if (!user) {
      res.redirect("/beautylash/users/login");
      // recommend to register new user
      return;
    }

    // User is found, then create the hashed+salted with req.body.password
    const saltedPassword = user.pwsalt + req.body.password;
    const hashConverter = createHash("sha256");
    hashConverter.update(saltedPassword);
    const newHashedPassword = hashConverter.digest("hex");

    // compare database pw and req.body.password
    if (user.hash !== newHashedPassword) {
      res.redirect("/beautylash/users/login");
    }
    // everything is nicely correct, then set 'session' and directed to dashboard
    req.session.user = user;
    res.redirect("/beautylash/users/dashboard");
  },
  dashboard: (req, res) => {
    res.render("/beautylash/users/dashboard.ejs");
  },
  logout: (req, res) => {
    res.session.destroy();
    res.redirect("/beautylash");
  },
};
