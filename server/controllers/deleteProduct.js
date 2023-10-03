const Product = require("../model/productSchema.js");

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = deleteProduct;
