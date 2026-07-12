const express = require("express");

const router = express.Router();

const emailControllers = require("../controllers/emailControllers");
const paymentController = require("../controllers/paymentControllers");

// Email
router.post("/send-email", emailControllers.sendConfirmationEmail);

// Razorpay
router.post("/create-order", paymentController.createOrder);

module.exports = router;