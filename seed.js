require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");
const { PostModel } = require("./models/post_model");

mongoose.set("useCreateIndex", true);

let data = [
  {
    name: "Jessica",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-1.jpg",
  },
  {
    name: "Maria",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-2.jpg",
  },
  {
    name: "Kelly",
    service: "Russian Volume Eyelash Extension",
    category: ["eyelash extension", "russian volume"],
    image: "/assets/customers/russian-volume-ext-6.jpg",
  },
  {
    name: "Julia",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-3.jpg",
  },
  {
    name: "Yayoi",
    service: "Skinny Volume Lash Extension",
    category: ["eyelash extension", "skinny volume"],
    image: "/assets/customers/skinny-volume-ext-1.jpg",
  },
  {
    name: "Selina",
    service: "Keratin Lashlift",
    category: ["lashlift"],
    image: "/assets/customers/lashlift-4.jpg",
  },
];

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
