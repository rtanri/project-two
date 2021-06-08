/* ========= dependencies ============ */
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const productController = require("./controllers/products_controller");
const userController = require("./controllers/users_controller");

/* ========= database ============ */
const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

/* ========= middleware ============ */
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ========= Routes: Products ============ */
app.get("/beautylash", productController.index);

app.get("/calendar", productController.calendar);

app.get("/beautylash/customers", productController.customers);

app.get("/beautylash/add-post", productController.newPost);

app.post("/beautylash/add-post", productController.createPost);

app.get("/beautylash/:slug", productController.show);

app.get("/", productController.homepage);

/* ========= Routes: User ============ */
app.get("/beautylash/users/login", userController.loginForm);

app.post("/beautylash/users/login", userController.loginUser);

app.get("/beautylash/users/register", userController.registerForm);

app.post("/beautylash/users/register", userController.registerUser);

app.get("/beautylash/users/dashboard", userController.dashboard);

/* ========= listener ============ */

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function () {
  // console.log(mongoURI);
  console.log("Server is connected with mongoDB");

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

db.on("error", console.error.bind(console, "connection error:"));
