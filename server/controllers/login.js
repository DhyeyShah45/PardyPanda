const User = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    const user = {
      username: admin.username,
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = login;
