// backend/models/order.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This defines the structure for products *within* an order
const orderItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // Price at the time of purchase
  },
  { _id: false }
); // _id: false stops Mongoose from creating sub-document IDs

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true },
    items: [orderItemSchema], // An array of items
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    // You could add more fields here like shippingAddress, phone, etc.
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;