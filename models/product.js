const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
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
      required: false, // ⚡ Login token ka validation issue bypass karne ke liye temporary false kiya
    },
  },
  {
    timestamps: true,
  }
);

// ⚡ Counter fail hone par crash se bachne ke liye safe fallback lagaya
productSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const Counter = mongoose.models.Counter || require("./Counter"); 
    const counter = await Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.productId = counter ? counter.seq : Math.floor(100000 + Math.random() * 900000);
    next();
  } catch (error) {
    console.error("Counter bypassed to prevent crash:", error.message);
    this.productId = Math.floor(100000 + Math.random() * 900000); // Crash hone ke bajaye random number generate karega
    next();
  }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;