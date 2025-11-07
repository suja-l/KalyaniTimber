// backend/server.js (Final and Complete)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Requires backend/routes/products.js and backend/models/product.model.js
const productRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 5000;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. MongoDB Connection
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    // --- CRITICAL FIX: Stabilizes the standard URI connection ---
    family: 4, // Forces Mongoose to use IPv4 DNS resolution
    serverSelectionTimeoutMS: 5000, // Provides faster feedback
  })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error("MongoDB connection error:", err));

// 3. Router Integration
// This tells Express to use the productRouter logic for all /products URLs.
app.use("/products", productRouter);

// 4. Define a simple test route
app.get("/", (req, res) => {
  res.send("Kalyani Timber Mart Backend is running!");
});

// 5. Start the Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
