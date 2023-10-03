const Product = require("../model/productSchema.js");
const productCreation = async (req, res) => {
  const { name, type, addedBy, qty, price, photo } = req.body;
  try {
    const product = new Product({ name, type, addedBy, qty, price, photo });
    await product.save();
    res.status(200).json({ message: "Product added" });
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = productCreation;
