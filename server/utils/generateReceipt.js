const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function generateReceipt(order) {

    let html = fs.readFileSync(
        path.join(__dirname, "../receipt/receipt.html"),
        "utf8"
    );
const css = fs.readFileSync(
    path.join(__dirname, "../receipt/receipt.css"),
    "utf8"
);

html = html.replace(
    "</head>",
    `<style>${css}</style></head>`
);
    html = html.replace(/{{customerName}}/g, order.customerName);
    html = html.replace(/{{orderId}}/g, order.orderId);
    html = html.replace(/{{orderDate}}/g, order.orderDate);
    html = html.replace(/{{orderStatus}}/g, order.orderStatus);

    html = html.replace(/{{subtotal}}/g, order.subtotal);
    html = html.replace(/{{discount}}/g, order.discount);
    html = html.replace(/{{shipping}}/g, order.shipping);
    html = html.replace(/{{total}}/g, order.total);

    html = html.replace(/{{paymentToday}}/g, order.paymentToday);
    html = html.replace(/{{remainingPayment}}/g, order.remainingPayment);

    html = html.replace(/{{address}}/g, order.address);
    html = html.replace(/{{city}}/g, order.city);
    html = html.replace(/{{state}}/g, order.state);
    html = html.replace(/{{pincode}}/g, order.pincode);

    html = html.replace(/{{products}}/g, order.products);

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.setContent(html, {
    waitUntil: "domcontentloaded"
});



    const pdf = await page.pdf({

    format: "A4",

    printBackground: true,

    margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm"
    }

});

    await browser.close();

    return pdf;
}

module.exports = {
    generateReceipt
};