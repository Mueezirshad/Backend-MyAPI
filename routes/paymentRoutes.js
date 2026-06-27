const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/paymentController"); // Apne controller ka sahi path dena

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;