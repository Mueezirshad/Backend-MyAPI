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


productSchema.pre("save", async function () {
  if (!this.isNew) return;

  const counter = await Counter.findOneAndUpdate(
    { name: "productId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.productId = counter.seq;
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;