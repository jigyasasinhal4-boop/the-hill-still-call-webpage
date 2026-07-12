const supabaseClient = window.supabase.createClient(
    "https://eimhnjoygynzeqjtwmyp.supabase.co",
    "sb_publishable_jkThzw4SJ8PxD-yQnHCbwA_Mub3qEMh"
);

document.getElementById("trackOrderButton").addEventListener("click", async () => {

    const orderId = document.getElementById("trackingOrderId").value.trim();
const formattedOrderId = orderId.toUpperCase();

if (!formattedOrderId.startsWith("HILL-")) {

    alert("Please enter your Order ID in HILL-0001 format.");

    return;

}
    if (!orderId) {

        alert("Please enter your Order ID.");

        return;

    }

   const dbId = parseInt(formattedOrderId.replace("HILL-", ""), 10);

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("id", dbId)
        .single();

    if (error) {

        document.getElementById("trackingResult").innerHTML = `
            <h3>Order not found.</h3>
        `;

        return;

    }
    function step(status, text){

    return `
    <div class="trackStep ${status}">
        <div class="trackCircle"></div>
        <div class="trackText">${text}</div>
    </div>
    `;

}
let timeline = "";

if (data.order_status === "Order Received")

timeline =
step("completed","Order Received") +
step("pending","Being Handcrafted") +
step("pending","Quality Check") +
step("pending","Packed") +
step("pending","Delivered");


else if (data.order_status === "Being Handcrafted") 

timeline =
step("completed","Order Received") +
step("active","Being Handcrafted") +
step("pending","Quality Check") +
step("pending","Packed") +
step("pending","Delivered");


else if (data.order_status === "Quality Check") 
    timeline =
step("completed","Order Received") +
step("completed","Being Handcrafted") +
step("active","Quality Check") +
step("pending","Packed") +
step("pending","Delivered");

else if (data.order_status === "Packed") 
    timeline =
step("completed","Order Received") +
step("completed","Being Handcrafted") +
step("completed","Quality Check") +
step("active","Packed") +
step("completed","Delivered");

else if (data.order_status === "Delivered") 
    timeline =
step("completed","Order Received") +
step("completed","Being Handcrafted") +
step("completed","Quality Check") +
step("completed","Packed") +
step("completed","Delivered");
    document.getElementById("trackingResult").innerHTML = `

<div class="trackingCard">

<h2>${formattedOrderId}</h2>

<p><strong>Customer:</strong> ${data.customer_name}</p>

<p><strong>Status:</strong> ${data.order_status}</p>

<p><strong>Total Order:</strong> ₹${data.total}</p>

<p><strong>Advance Paid:</strong> ₹${data.payment_today}</p>

<p><strong>Balance Due:</strong> ₹${data.total - data.payment_today}</p>

<hr>

<h3>Order Progress</h3>

<div class="trackingTimeline">

${timeline}

</div>

</div>

`;
}); 