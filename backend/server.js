const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");

const app = express();
const port = process.env.PORT || 5000; // Running on 5000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB database connection established successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Router Integration
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});