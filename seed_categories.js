require("dotenv").config();
const mongoose = require("mongoose");
const _ = require("lodash");
const { CategoryModel } = require("./models/category_model");

mongoose.set("useCreateIndex", true);

let data = [
  {
    category: "Lash Lift",
    detail:
      "Lash lift is not a lash-extensions. Our 45 minute session uses KERATIN serum to lift your natural lashes from the roots, lasting glossy looks for up to 2 months. Keratin treatment is famous to help grow short and thin lash.",
    use_case: "Fresh and natural looks; boost lash health",
  },
  {
    category: "Russian Volume",
    detail:
      "6D Russian volume eyelash extensions is always surprisingly light, soft and long lasting. Signature russian set of lashes are has high retention lasting 4 weeks++. You can fully customize your set by adding more volume for glamorous look.",
    use_case: "Travel photos, wedding, and dinner date",
  },
  {
    category: "Skinny Volume",
    detail:
      "2D Skinny volume eyelash extension replaces your daily mascara and eyeliner every morning - to start your day without eye touch-up. This slim extensions type has high retention lasting 4 weeks++. Based on your eyes shape, we can customise a 'doll-eyes' or 'cat-eyes' for you.",
    use_case: "Office executive looks, attending events",
  },
];

/* ======== connection ======== */

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

let connection = null;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connResp => {
    connection = connResp;
    return CategoryModel.insertMany(data);
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
