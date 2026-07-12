const { generateReceipt } = require("../utils/generateReceipt");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendConfirmationEmail(req, res) {

    try {

       const {
    email,
    customerName,
    orderId,
    orderedProducts,
    subtotal,
    discount,
    shipping,
    total,
    paymentToday,
    remainingPayment,
    address,
    state,
    pincode
} = req.body;
const productsHTML = orderedProducts.map(product => `
<tr>
    <td>${product.name}</td>
    <td>${product.quantity}</td>
    <td>₹${product.price}</td>
    <td>₹${product.price * product.quantity}</td>
</tr>
`).join("");

const receiptPDF = await generateReceipt({
    customerName,
    orderId,
    orderDate: new Date().toLocaleDateString("en-IN"),
    orderStatus: "Order Received",

    subtotal,
    discount,
    shipping,
    total,

    paymentToday,
    remainingPayment,

    address,
    state,
    city,
    pincode,

    products: productsHTML
});
const fs = require("fs");

fs.writeFileSync("receipt.pdf", receiptPDF);
console.log("EMAIL FUNCTION WAS CALLED");
const productList = orderedProducts.map(product => `
<li>
${product.name} × ${product.quantity}
- ₹${product.price * product.quantity}
</li>
`).join("");
        const data = await resend.emails.send({

            from: "HillCraft <onboarding@resend.dev>",

            to: email,

            subject: "Your HillCraft Order is Confirmed 🌿",

            html: `
            
<div style="max-width:650px;margin:auto;padding:30px;background:#faf7f2;border-radius:12px;font-family:Arial,sans-serif;color:#333;">

<h1 style="color:#6B3F1D;text-align:center;">🌿 HillCraft</h1>

<h2 style="text-align:center;">Your Order is Confirmed!</h2>

<p>Hello <b>${customerName}</b>,</p>

<p>Thank you for supporting the artisans of Uttarakhand. Your order has been successfully placed.</p>

<div style="background:white;padding:20px;border-radius:10px;margin:20px 0;">

<h3>Order Details</h3>

<p><b>Order ID:</b> ${orderId}</p>

<p><b>Status:</b> Order Received</p>

<hr>

<h3>Products</h3>

<ul>
${productList}
</ul>
</ul>

<hr>

<h3>Payment Summary</h3>

<p>Subtotal: ₹${subtotal}</p>
<p>Discount: ₹${discount}</p>
<p>Shipping: ₹${shipping}</p>
<p><b>Grand Total:</b> ₹${total}</p>
<p>Paid Today: ₹${paymentToday}</p>
<p>Balance on Delivery: ₹${remainingPayment}</p>
<hr>

<h3>Delivery Address</h3>

<p>
${address}<br>
${city}, ${state} - ${pincode}
</p>

</div>

<div style="text-align:center;margin-top:25px;">

<a href="https://thehillsstillcall.com/tracking.html"
style="background:#6B3F1D;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
Track Your Order
</a>

</div>

<p style="margin-top:30px;">
Keep your <b>Order ID (${orderId})</b> safe. You'll need it to track your handcrafted order.
</p>

<p style="text-align:center;margin-top:40px;">
❤️ Thank you for supporting HillCraft.
</p>

</div>
`,

attachments: [
{
    filename: `HillCraft-Receipt-${orderId}.pdf`,
    content: receiptPDF.toString("base64")
}
]

});
console.log("RESEND FINISHED");
console.log(data);

return res.status(200).json({
    success: true
});

    } catch (error) {

        console.error(error);

        res.status(500).json(error);

    }

}

module.exports = {
    sendConfirmationEmail
};