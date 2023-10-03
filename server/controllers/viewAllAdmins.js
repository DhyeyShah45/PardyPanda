const User = require("../model/userSchema");
const viewAllAdmins = async (req, res) => {
  try {
    const response = await User.find();
    const filteredUsers = response.filter((user) => user.role !== "Super");
    res.status(200).json(filteredUsers);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = viewAllAdmins;
