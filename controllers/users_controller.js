const { UserModel } = require("../models/user_model");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");

module.exports = {
  registerForm: (req, res) => {
    res.render("users/register.ejs");
  },
  loginForm: (req, res) => {
    res.render("users/login.ejs");
  },
  dashboard: (req, res) => {
    res.render("users/dashboard.ejs");
  },
};
