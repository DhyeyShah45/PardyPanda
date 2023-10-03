const User = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const adminCreation = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const admin = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const check = await User.find({ email });
    if (check.length > 0) {
      res.status(401).json({ error: "User Already exists" });
    } else {
      const savedAdmin = await admin.save();
      res.status(201).json({ message: "Admin Created" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = adminCreation;
