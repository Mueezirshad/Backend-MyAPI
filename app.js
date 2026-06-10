const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("VanishMart Live Backend — MongoDB & Cloudinary Integration Active!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((err, _req, res, _next) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = app;