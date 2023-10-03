const User = require("../model/userSchema.js");
const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await User.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = deleteAdmin;
