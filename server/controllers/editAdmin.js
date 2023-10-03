const User = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const editAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin Updated" });
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = editAdmin;
