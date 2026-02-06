const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const authRouter = require("./routes/auth"); // ADDED

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter); // ADDED

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});