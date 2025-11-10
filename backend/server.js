// backend/server.js (Updated with better error handling)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 5000;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. MongoDB Connection with better error handling
const uri = process.env.MONGODB_URI;

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB database connection established successfully");
    console.log("📍 Connected to database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit if database connection fails
  });

// Monitor connection status
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// 3. Router Integration
app.use("/products", productRouter);

// 4. Test route
app.get("/", (req, res) => {
  res.json({
    message: "Kalyani Timber Mart Backend is running!",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// 6. Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
  console.log(`📍 Access at: http://localhost:${port}`);
  console.log(`📦 Products endpoint: http://localhost:${port}/products`);
});
