require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");
const { PostModel } = require("./models/post_model");
const moment = require("moment");

mongoose.set("useCreateIndex", true);

const timestampNow = moment().utc();

let data = [
  {
    name: "Marry",
    service: "GEL Keratin Lash Lift and Tint",
    category: "Lash Lift",
    image: "/assets/customers/lashlift-1.jpg",
    created_at: timestampNow,
  },
  {
    name: "Isabella",
    service: "GEL Keratin Lash Lift and Tint",
    category: "Lash Lift",
    image: "/assets/customers/lashlift-2.jpg",
    created_at: timestampNow,
  },
  {
    name: "Marry",
    service: "GEL Keratin Lash Lift and Tint",
    category: "Lash Lift",
    image: "/assets/customers/lashlift-3.jpg",
    created_at: timestampNow,
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
