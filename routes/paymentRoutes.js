const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/paymentController"); // Apne controller ka sahi path dena

// ⚡ Yeh rasta hum frontend ke liye khol rahe hain
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;