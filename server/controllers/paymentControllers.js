const Razorpay = require("razorpay");
const { validationResult } = require("express-validator");
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createOrder(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        const { amount, orderId } = req.body;

        const options = {

            amount: Math.round(Number(amount) * 100),

            currency: "INR",

            receipt: orderId

        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to create Razorpay Order."
        });

    }

}

module.exports = {
    createOrder
};