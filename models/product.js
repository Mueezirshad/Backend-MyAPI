const mongoose = require("mongoose");
const Counter = require("./Counter"); 

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true, 
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true, 
    },
    thumbnail: {
      type: String, 
      required: true,
    },
    images: {
      type: [String], 
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Counter timeout")), 2000)
  );

  try {
    const counter = await Promise.race([
    Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    ),
    timeoutPromise
    ]);

    this.productId = counter ? counter.seq : Math.floor(Math.random() * 10000);
    return next();
  } catch (error) {
    console.error("⚠️ Counter phans gaya ya error aaya, fallback generated:", error.message);
    this.productId = Math.floor(Math.random() * 10000);
    return next(error);
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;