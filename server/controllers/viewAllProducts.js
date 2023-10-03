const Product = require("../model/productSchema.js");
const viewAllProducts = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json(response);
    // console.log(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = viewAllProducts;
