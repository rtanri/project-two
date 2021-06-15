require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");
const { PostModel } = require("./models/post_model");

mongoose.set("useCreateIndex", true);

let data = [
  {
    name: "Marry",
    service: "GEL Keratin Lash Lift and Tint",
    category: "Lash Lift",
    image: "/assets/customers/lashlift-1.jpg",
  },
  {
    name: "Isabella",
    service: "GEL Keratin Lash Lift and Tint",
    category: "Lash Lift",
    image: "/assets/customers/lashlift-3.jpg",
  },
  {
    name: "Isa",
    service: "Russian Volume Eyelash Extension",
    category: "Russian Volume",
    image: "/assets/customers/russian-volume-ext-4.jpg",
  },
  {
    name: "Jane",
    service: "Skinny Volume Eyelash Extension",
    category: "Skinny Volume",
    image: "/assets/customers/skinny-volume-ext-3.jpg",
  },
];

data = data.map(item => {
  item.slug = _.kebabCase(item.service);
  return item;
});

/* ======== connection ======== */

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

let connection = null;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connResp => {
    connection = connResp;
    return PostModel.insertMany(data);
  })
  .then(insertResp => {
    console.log("Successful data insertion");
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    if (connection != null) {
      connection.disconnect();
    }
  });
