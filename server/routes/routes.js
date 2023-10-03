const express = require("express");
const router = express.Router();
const adminCreation = require("../controllers/adminCreation.js");
const productCreation = require("../controllers/productCreation.js");
const viewAllProducts = require("../controllers/viewAllProducts.js");
const viewAllAdmins = require("../controllers/viewAllAdmins.js");
const deleteProduct = require("../controllers/deleteProduct.js");
const deleteAdmin = require("../controllers/deleteAdmin.js");
const editProduct = require("../controllers/editProduct.js");
const editAdmin = require("../controllers/editAdmin.js");
const login = require("../controllers/login.js");
const verifyToken = require("../middleware/verifyToken.js");
const verifySuperAdmin = require("../middleware/verifySuperAdmin.js");

router.post("/login", login); //admin login
router.post("/add/admin", verifyToken, verifySuperAdmin, adminCreation); //admin creation - a
router.post("/add/product", verifyToken, productCreation); //product creation
router.get("/products", verifyToken, viewAllProducts); //view all products
router.get("/admins", verifyToken, verifySuperAdmin, viewAllAdmins); //view admins - a
router.delete("/product/:id", verifyToken, verifySuperAdmin, deleteProduct); //delete product - a
router.delete("/admin/:id", verifyToken, verifySuperAdmin, deleteAdmin); //delete admin - a
router.put("/product/:id", verifyToken, editProduct); //edit product
router.put("/admin/:id", verifyToken, verifySuperAdmin, editAdmin); //edit admin - a

module.exports = router;
