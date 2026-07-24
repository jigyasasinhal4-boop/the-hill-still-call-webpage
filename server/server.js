require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const paymentRoutes = require("./routes/payment");
const app = express();
app.set("trust proxy",)
app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: 
false
  })
);
app.use(hpp());

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later."
});

app.use(limiter);
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://the-hill-still-call-webpage-qdkf.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "100kb"
}));
app.use("/payment", paymentRoutes);
app.get("/", (req, res) => {
    res.send("The Hills Still Call Backend Running ❤️");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});