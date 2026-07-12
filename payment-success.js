// ===============================
// PAYMENT SUCCESS
// ===============================

const orderId = sessionStorage.getItem("currentOrderId");

if (orderId) {

    document.getElementById("successOrderId").textContent = orderId;

} else {

    document.getElementById("successOrderId").textContent = "Order Not Found";

}