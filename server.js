/* ========= dependencies ============ */
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000; //ternary operator

const methodOverride = require("method-override");

const productController = require("./controllers/products_controller");
const userController = require("./controllers/users_controller");
const bookingController = require("./controllers/booking_controller");
const session = require("express-session");
const {
  authenticatedOnly: authenticatedOnlyMiddleware,
  guestOnly: guestOnlyMiddleware,
  setUserVarMiddleware: setUserVarMiddleware,
} = require("./middlewares/authMiddleware");

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
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "user_session",
    resave: false,
    saveUninitialized: false, // need for login session
    cookie: { path: "/", secure: false, maxAge: 7200000 },
  })
);
app.use(setUserVarMiddleware);

/* ========= Routes: Products ============ */
app.get("/beautylash", productController.index);

// show
app.get("/beautylash/customers/:id", productController.show);

app.get("/beautylash/customers", productController.customers);

// create
app.post(
  "/beautylash/customers-with-filter",
  productController.customersWithFilter
);

// create
app.post("/beautylash/add-post", productController.createPost);

/* ========= Routes: User ============ */
// rendering combined login + register
app.get(
  "/beautylash/users/user-sign-in",
  guestOnlyMiddleware,
  userController.combinedForm
);

// login
app.get(
  "/beautylash/users/login",
  guestOnlyMiddleware,
  userController.loginForm
);

app.post(
  "/beautylash/users/login",
  guestOnlyMiddleware,
  userController.loginUser
);

// register
app.get(
  "/beautylash/users/register",
  guestOnlyMiddleware,
  userController.registerForm
);

app.post(
  "/beautylash/users/register",
  guestOnlyMiddleware,
  userController.registerUser
);

// render dashboard page
app.get(
  "/beautylash/users/dashboard",
  authenticatedOnlyMiddleware,
  userController.dashboard
);

// render edit page
app.get("/beautylash/users/:id/edit", userController.edit);
app.patch("/beautylash/users/:id/", userController.update);

// logout
app.post("/users/logout", authenticatedOnlyMiddleware, userController.logout);

/* ========= Routes: Bookings ============ */

app.post("/calendar-booking", bookingController.calendarBooking);

app.get("/calendar-event", bookingController.calendarEvent);

app.delete("/delete-booking", bookingController.deleteBooking);

app.get("/", productController.homepage);

/* ========= listener ============ */

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function () {
  console.log("Server is connected with mongoDB");

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

db.on("error", console.error.bind(console, "connection error:"));
