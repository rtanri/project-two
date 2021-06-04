/* ========= dependencies ============ */
const express = require("express");
const app = express();
const port = 3000;
const productController = require("./controllers/products_controller");

/* ========= middleware ============ */
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ========= routes ============ */
app.get("/beautylash", productController.index);

app.get("/beautylash/customers", productController.customers);

app.get("/", productController.homepage);

/* ========= listener ============ */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
