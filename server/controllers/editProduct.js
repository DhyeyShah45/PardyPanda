const Product = require("../model/productSchema.js");
const editProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const { name, type, qty, price, photo } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        type,
        qty,
        price,
        photo,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = editProduct;
