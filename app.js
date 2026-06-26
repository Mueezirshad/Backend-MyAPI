const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // Sahi path check kar lena file ka


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/payment", paymentRoutes);

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    next(error);
  }
});

app.get("/", (_req, res) => {
  res.send("VanishMart Live Backend — MongoDB & Cloudinary Integration Active!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((err, _req, res, _next) => {
  if (err) {
    const status = err.message.includes("MONGODB_URI") ? 500 : 400;
    return res.status(status).json({ message: err.message });
  }
});

module.exports = app;