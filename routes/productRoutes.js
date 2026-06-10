const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productController");
const upload = require("../middleware/multer");
const protect = require("../middleware/auth");

router.get("/", getAllProducts);

router.post("/add", protect, upload.single("productImage"), createProduct);

module.exports = router;