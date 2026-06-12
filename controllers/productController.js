const Product = require("../models/product");
const uploadToCloudinary = require("uploads/cloudinary")
const NodeCache = require("node-cache");
const productCache = new NodeCache({ stdTTL: 300 });

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, phoneNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, "VanishMart_products");

    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      phoneNumber,
      thumbnail: imageUrl,
      userId: req.user._id, 
    });

    productCache.del("all_products"); 
    console.log("🗑️ Cache cleared due to new product addition!");

    res.status(201).json({
      message: "Product listed successfully! 🎉",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const cacheKey = "all_products";

    if (productCache.has(cacheKey)) {
      console.log("🚀 Fetching Products from Cache memory! (Fast Link)");
      return res.status(200).json({ 
        success: true, 
        source: "cache", 
        products: productCache.get(cacheKey) 
      });
    }

    console.log("🍃 Fetching Products from MongoDB Database... (First Time Hit)");
    const products = await Product.find().populate("userId", "name email");

    productCache.set(cacheKey, products);

    res.status(200).json({ 
      success: true, 
      source: "database", 
      products 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};