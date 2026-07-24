require("dotenv").config();
console.log(process.env.RESEND_API_KEY);
const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const paymentRoutes = require("./routes/payment");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/payment", paymentRoutes);
app.use(hpp());
app.get("/", (req, res) => {
    res.send("The Hills Still Call Backend Running ❤️");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});