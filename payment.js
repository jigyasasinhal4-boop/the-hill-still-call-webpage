const supabaseClient = window.supabase.createClient(
    "https://eimhnjoygynzeqjtwmyp.supabase.co",
    "sb_publishable_jkThzw4SJ8PxD-yQnHCbwA_Mub3qEMh"
);
history.replaceState(null, null, location.href);

window.onpopstate = function () {
    window.location.replace("home.html");
};
async function loadOrder() {

    const orderId = sessionStorage.getItem("currentOrderId");

if (!orderId) {

    alert("No order found.");

    window.location.href = "preorder.html";

    return;

}

const dbId = parseInt(orderId.replace("HILL-", ""), 10);

const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("id", dbId)
    .single();

if (error) {

    console.error(error);

    alert(JSON.stringify(error));

    return;

}
const order = data;
console.log(order);
   document.getElementById("orderId").textContent =
"HILL-" + String(order.id).padStart(4, "0");
    document.getElementById("productCount").textContent =
order.cart.length + " Item(s)";
document.getElementById("paymentAmount").textContent =
"₹" + order.payment_today;
document.getElementById("shippingCharge").textContent =
"₹" + order["shipping_charge"];

document.getElementById("grandTotal").textContent =
"₹" + order["grand total value"];
const upiLink =
`upi://pay?pa=paytm.s1zhilr@pty&pn=The%20Hills%20Still%20Call&am=${order.payment_today}&cu=INR`;

QRCode.toDataURL(upiLink, function (err, url) {

    if (err) {

        console.error(err);

        return;

    }

    document.getElementById("upiQR").src = url;

});
}
loadOrder();
/*
document.getElementById("payNowButton").addEventListener("click", async () => {

    console.log("Pay button clicked");
if (!acceptTerms.checked) {

    alert("Please accept the Terms & Policies before continuing.");

    return;

}
    try {

        const response = await fetch("https://the-hill-still-call-webpage.onrender.com/payment/create-order", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

    orderId: document.getElementById("orderId").textContent,

    amount: Number(
        document.getElementById("paymentAmount")
        .textContent
        .replace("₹", "")
        .trim()
    )

})

        });

        const result = await response.json();

     const options = {

    key: "YOUR_RAZORPAY_KEY_ID",

    amount: result.amount,

    currency: result.currency,

    name: "The Hills Still Call",

    description: "HillCraft Pre-Order",

    order_id: result.id,

    handler: function (response) {

    console.log(response);

    window.location.href = "payment-success.html";

}

};

const razorpay = new Razorpay(options);

razorpay.open();

    } catch (err) {

        console.error(err);

        alert("Unable to connect to payment server.");

    }

});
*/
/*
const acceptTerms = document.getElementById("acceptTerms");
const payNowButton = document.getElementById("payNowButton");

acceptTerms.addEventListener("change", () => {

    payNowButton.disabled = !acceptTerms.checked;

});
*/
const openUpiButton = document.getElementById("openUpiButton");

if (openUpiButton) {

    openUpiButton.addEventListener("click", () => {

        const amount =
            document.getElementById("paymentAmount")
            .textContent
            .replace("₹", "")
            .trim();

        const upiLink =
            `upi://pay?pa=paytm.s1zhilr@pty&pn=The%20Hills%20Still%20Call&am=${amount}&cu=INR`;

        window.location.href = upiLink;

    });

}
const acceptTerms = document.getElementById("acceptTerms");
const submitPaymentButton = document.getElementById("submitPaymentButton");

acceptTerms.addEventListener("change", () => {

    submitPaymentButton.disabled = !acceptTerms.checked;

});
submitPaymentButton.addEventListener("click", async () => {

    const transactionId =
        document.getElementById("transactionId").value.trim();

    if (!transactionId) {

        alert("Please enter your UPI Transaction ID.");

        return;

    }
    const orderId = sessionStorage.getItem("currentOrderId");

const dbId = parseInt(orderId.replace("HILL-", ""), 10);
console.log("Updating order:", dbId);
console.log("Transaction ID:", transactionId);

const { data, error } = await supabaseClient
    .from("orders")
    .update({
        transaction_id: transactionId,
        order_status: "Payment Verification Pending"
    })
    .eq("id", dbId)
    .select();

console.log("Updated data:", data);
console.log("Update error:", error);
    if (error) {

    console.error(error);

    alert("Unable to save your payment details. Please try again.");

    return;

}

window.location.href = 
"payment-success.html";
});