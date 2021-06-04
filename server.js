//dependencies
const express = require("express");
const app = express();
const port = 3000;

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.render("products/index");
});

// listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
