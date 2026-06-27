const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productController");
const upload = require("../middleware/multer");
const protect = require("../middleware/auth");

router.get("/", getAllProducts);

// ⚡ Multer ko pehle rakhein taake wo multipart data aur file ko sahi se process kar sake
router.post("/add", upload.single("thumbnail"), protect, createProduct);

module.exports = router;