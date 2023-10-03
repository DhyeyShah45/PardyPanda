const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.error(e);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.PORT || 8000}`);
});
