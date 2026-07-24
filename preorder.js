// ===============================
// SUPABASE
// ===============================

const supabaseClient = window.supabase.createClient(
    "https://eimhnjoygynzeqjtwmyp.supabase.co",
    "sb_publishable_jkThzw4SJ8PxD-yQnHCbwA_Mub3qEMh"
);

// ===============================
// PRODUCTS
// ===============================

const products = [

{
id:"buransh",
name:"Buransh Bloom Sling",
price:600,
quantity:0,
weight:120
},

{
id:"charm",
name:"Whispering Pines Charm",
price:250,
quantity:0,
weight:20
},

{
id:"journal",
name:"Kafal Chronicles Journal",
price:500,
quantity:0,
weight:200
},

{
id:"pouch",
name:"Where Mountains Rest Pouch",
price:500,
quantity:0,
weight:40
}

];

// ===============================
// HTML ELEMENTS
// ===============================

const productSelection=document.getElementById("productSelection");

const cartSubtotal=document.getElementById("cartSubtotal");
const cartDiscount=document.getElementById("cartDiscount");
const cartTotal=document.getElementById("cartTotal");
const payToday=document.getElementById("payToday");
const remainingPayment=document.getElementById("remainingPayment");
const shippingAmount=document.getElementById("shippingAmount");
const couponCode=document.getElementById("couponCode");
const applyCoupon=document.getElementById("applyCoupon");
const discountMessage=document.getElementById("discountMessage");

// ===============================
// CREATE PRODUCT CARDS
// ===============================

products.forEach(product=>{

productSelection.innerHTML+=`

<div class="cartItem">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<div class="quantityBox">

<button class="minusBtn" data-id="${product.id}">−</button>

<span id="${product.id}Qty">0</span>

<button class="plusBtn" data-id="${product.id}">+</button>

</div>

</div>

`;

});

// ===============================
// BUTTONS
// ===============================

document.querySelectorAll(".plusBtn").forEach(button=>{

button.addEventListener("click",()=>{

const product=products.find(p=>p.id===button.dataset.id);

product.quantity++;

document.getElementById(product.id+"Qty").textContent=product.quantity;

updateTotals();

});

});

document.querySelectorAll(".minusBtn").forEach(button=>{

button.addEventListener("click",()=>{

const product=products.find(p=>p.id===button.dataset.id);

if(product.quantity>0){

product.quantity--;

}

document.getElementById(product.id+"Qty").textContent=product.quantity;

updateTotals();

});

});
// ===============================
// TOTALS
// ===============================

let couponApplied=false;

function updateTotals() {

    let subtotal = 0;
    let totalWeight = 0;

    products.forEach(product=>{

        subtotal += product.price * product.quantity;

        totalWeight += product.weight * product.quantity;

    });

let discount = 0;

if(couponApplied){

discount = subtotal * 0.10;

}

const shipping = 0;

const total = subtotal - discount;

const today = total / 2;

const remaining = total - today;

cartSubtotal.textContent = "₹" + subtotal;

cartDiscount.textContent = "₹" + discount;

shippingAmount.textContent = "Will be calculated at checkout";

cartTotal.textContent = "₹" + total;

payToday.textContent = "₹" + today;

remainingPayment.textContent = "₹" + remaining + " + Shipping";

}

// ===============================
// COUPON
// ===============================

applyCoupon.addEventListener("click",()=>{

const code=couponCode.value.trim().toUpperCase();

if(code==="LUNA10"){

couponApplied=true;

discountMessage.textContent="✓ LUNA10 Applied Successfully";

discountMessage.style.color="#7CFC98";

}else{

couponApplied=false;

discountMessage.textContent="Invalid Coupon Code";

discountMessage.style.color="#ff8080";

}

updateTotals();

});

// ===============================
// START VALUES
// ===============================

updateTotals();
// ===============================
// SUBMIT ORDER
// ===============================

document.getElementById("checkoutButton").addEventListener("click", async ()=>{
    console.log("STEP 1");
const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.disabled = true;
checkoutButton.textContent = "Processing...";
productSelection.style.pointerEvents = "none";
applyCoupon.disabled = true;
couponCode.disabled = true;
const customerName=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const email=document.getElementById("customerEmail").value.trim();
const address=document.getElementById("customerAddress").value.trim();
const state=document.getElementById("customerState").value.trim();
const city=document.getElementById("customerCity").value.trim();
const pincode=document.getElementById("customerPincode").value.trim();
let shippingType = "zone";
// Local state courier rates.
const stateStates = [
    "UTTARAKHAND"
];
// States that use Zone courier rates.
// Applies to all cities in these states unless the city is listed in metroCities.
const zoneStates = [
    "UTTAR PRADESH",
    "HIMACHAL PRADESH",
    "HARYANA",
    "PUNJAB",
    "RAJASTHAN",
];
// Cities that use Metro courier rates.
// These cities take priority even if their state is in the Zone list.
const metroCities = [
    "DELHI",
    "LUCKNOW",
    "AHMEDABAD",
    "MUMBAI",
    "NAGPUR",
    "HYDERABAD",
    "BENGALURU",
    "CHENNAI",
    "KOCHI",
    "KOLKATA"
];
const customerState = state.trim().toUpperCase();

const customerCity = city.trim().toUpperCase();
if (
    customerState === "UTTARAKHAND" ||
    customerState === "UTTAR PRADESH"
) {

    shippingType = "state";

}

else if (metroCities.includes(customerCity)) {

    shippingType = "metro";

}
if(
!customerName||
!phone||
!email||
!address||
!state||
!city||
!pincode
){

alert("Please complete all customer details.");

return;

}

const orderedProducts = products
.filter(product=>product.quantity>0)
.map(product=>({

name:product.name,
price:product.price,
quantity:product.quantity,
weight:product.weight

}));

if(orderedProducts.length===0){

alert("Please select at least one product.");

return;

}

let subtotal = 0;

let totalWeight = 0;

products.forEach(product=>{

subtotal += product.price * product.quantity;

totalWeight += product.weight * product.quantity;

});

console.log("Total Parcel Weight:", totalWeight, "grams");

let discount=0;

const coupon=couponCode.value.trim().toUpperCase();

if(couponApplied){

discount=subtotal*0.10;

}

const total = subtotal - discount;

// ==========================
// SHIPPING CALCULATION
// ==========================

let shipping = 0;

if (shippingType === "state") {

    if (totalWeight <= 100) {

        shipping = 70;

    } else if (totalWeight <= 500) {

        shipping = 120;

    } else if (totalWeight <= 1000) {

        shipping = 140;

    } else {

        shipping = 140 + Math.ceil((totalWeight - 1000) / 1000) * 120;

    }

}

else if (shippingType === "zone") {

    if (totalWeight <= 100) {

        shipping = 80;

    } else if (totalWeight <= 500) {

        shipping = 130;

    } else if (totalWeight <= 1000) {

        shipping = 160;

    } else {

        shipping = 160 + Math.ceil((totalWeight - 1000) / 1000) * 120;

    }

}

else {

    if (totalWeight <= 100) {

        shipping = 120;

    } else if (totalWeight <= 500) {

        shipping = 160;

    } else if (totalWeight <= 1000) {

        shipping = 220;

    } else {

        shipping = 220 + Math.ceil((totalWeight - 1000) / 1000) * 160;

    }

}

const totalWithShipping = total + shipping;

const paymentToday = totalWithShipping / 2;

const remainingPaymentAmount = totalWithShipping - paymentToday;
console.log("STEP 2");
const { data, error } = await supabaseClient

.from("orders")
.insert([{
customer_name:customerName,

phone:phone,

email:email,

address:address,

state:state,

city: city,

pincode:pincode,

cart:orderedProducts,

subtotal:subtotal,

discount:discount,

shipping_charge:shipping,

"grand total value":totalWithShipping,

total:total,

payment_today:paymentToday,

coupon:couponApplied?coupon:"",

order_status:"Order Recieved"

}])
.select()
.single();
console.log("STEP 3");
if (error) {

    console.error(error);

    checkoutButton.disabled = false;
    checkoutButton.textContent = "Proceed to Checkout";
    productSelection.style.pointerEvents = "auto";

    alert("Unable to place your order. Please try again.");

    return;

}
const orderNumber = "HILL-" + String(data.id).padStart(4, "0");
try {
console.log("STEP 4");
    const response = await fetch("https://the-hill-still-call-webpage.onrender.com/payment/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       body: JSON.stringify({
    email: email,
    customerName: customerName,
    orderId: orderNumber,

    orderedProducts: orderedProducts,

    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    total: total,
    paymentToday: paymentToday,
    remainingPayment: remainingPaymentAmount,
    address: address,
    state: state,
    city: city,
    pincode: pincode
})
    });

    if (!response.ok) {
        console.log("Email could not be sent.");
    }

   const result = await response.json();
console.log("STEP 5");
console.log("STEP 5A");
document.getElementById("successPopup").classList.remove("hidden");
console.log("STEP 5B");
console.log(result);

if (result.error) {
    alert(result.error.message);
}

}
 catch (err) {

    console.error("Email Error:", err);

    checkoutButton.disabled = false;
    checkoutButton.textContent = "Proceed to Checkout";

}


sessionStorage.setItem("currentOrderId", orderNumber);

document.getElementById("popupOrderId").textContent =
    "Order ID: " + orderNumber;
console.log("STEP 6");
document.getElementById("successPopup").classList.remove("hidden");
checkoutButton.disabled = false;
checkoutButton.textContent = "Proceed to Checkout";
productSelection.style.pointerEvents = "auto";
applyCoupon.disabled = false;
couponCode.disabled = false;
products.forEach(product => {
    product.quantity = 0;
    document.getElementById(product.id + "Qty").textContent = 0;
});

couponApplied = false;
couponCode.value = "";
discountMessage.textContent = "";

document.getElementById("customerName").value = "";
document.getElementById("customerPhone").value = "";
document.getElementById("customerEmail").value = "";
document.getElementById("customerAddress").value = "";
document.getElementById("customerState").value = "";
document.getElementById("customerCity").value = "";
document.getElementById("customerPincode").value = "";

updateTotals();
});
document.getElementById("continuePayment").addEventListener("click", () => {
    window.location.href = "payment.html";
});