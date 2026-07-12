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
}
loadOrder();
document.getElementById("payNowButton").addEventListener("click", async () => {

    console.log("Pay button clicked");
if (!acceptTerms.checked) {

    alert("Please accept the Terms & Policies before continuing.");

    return;

}
    try {

        const response = await fetch("http://localhost:3000/payment/create-order", {

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
const acceptTerms = document.getElementById("acceptTerms");
const payNowButton = document.getElementById("payNowButton");

acceptTerms.addEventListener("change", () => {

    payNowButton.disabled = !acceptTerms.checked;

});