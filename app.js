// Polyfill crypto for older Node versions
const { webcrypto } = require("crypto");
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category"); // New
const sliderroutes=require("./routes/slidercat");
const productrow = require("./routes/productrow");
const featuredproduct = require("./routes/featuredproduct");
const breakfastRoutes = require("./routes/breakefast");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["https://grocerystore-production-362f.up.railway.app"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed for: " + origin), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes); // New
app.use("/api/productslider", sliderroutes);
app.use("/api/productrow", productrow);
app.use("/api/featuredproduct", featuredproduct);
app.use("/api/breakfast", breakfastRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("Grocery Store API is running");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});