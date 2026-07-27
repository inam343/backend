const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category"); // New
const sliderroutes = require("./routes/slidercat");
const productrow = require("./routes/productrow");
const featuredproduct = require("./routes/featuredproduct");
const breakfastRoutes = require("./routes/breakefast");

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins (local dev + deployed frontend)
const allowedOrigins = [
    "http://localhost:3000",
    process.env.CLIENT_URL, // e.g. https://your-frontend.vercel.app
];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman, curl, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
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