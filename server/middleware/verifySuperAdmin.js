const verifySuperAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== "Super") {
    return res
      .status(400)
      .json({ error: "Only Super Admin can access this data" });
  }
  next();
};
module.exports = verifySuperAdmin;
