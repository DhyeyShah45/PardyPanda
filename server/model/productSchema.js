const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  //  Name, Type, Added By, Qty, Price, Photo.
  name: String,
  type: String,
  addedBy: String,
  qty: Number,
  price: Number,
  photo: String,
});

module.exports = mongoose.model("Product", productSchema);
