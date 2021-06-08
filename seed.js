require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");
const { PostModel } = require("./models/post_model");

mongoose.set("useCreateIndex", true);

let data = [
  {
    name: "Chelsea",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-5.jpg",
  },
  {
    name: "Sukanya Ize",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-6.jpg",
  },
  {
    name: "Ploy Chan",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-7.jpg",
  },
  {
    name: "Kim Lee",
    service: "Russian Volume Eyelash Extension",
    category: ["russian volume"],
    image: "/assets/customers/russian-volume-ext-1.jpg",
  },
  {
    name: "Cherrine",
    service: "Skinny Volume Lash Extension",
    category: ["russian volume"],
    image: "/assets/customers/russian-volume-ext-2.jpg",
  },
  {
    name: "Lee Chun Yu",
    service: "Skinny Volume Lash Extension",
    category: ["russian volume"],
    image: "/assets/customers/russian-volume-ext-3.jpg",
  },
  {
    name: "Jaiko",
    service: "Skinny Volume Lash Extension",
    category: ["russian volume"],
    image: "/assets/customers/russian-volume-ext-4.jpg",
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
