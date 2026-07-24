const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const emailControllers = require("../controllers/emailControllers");
const paymentController = require("../controllers/paymentControllers");

// Email
router.post(
    "/send-email",

    body("email")
        .isEmail()
        .normalizeEmail(),

    body("customerName")
        .trim()
        .isLength({ min: 2, max: 100 }),

    body("orderId")
        .trim()
        .notEmpty(),

    emailControllers.sendConfirmationEmail
);

// Razorpay
router.post(
    "/create-order",

    body("amount")
        .isNumeric()
        .withMessage("Amount must be a number.")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0."),

    body("orderId")
        .notEmpty()
        .withMessage("Order ID is required."),

    paymentController.createOrder
);
module.exports = router;