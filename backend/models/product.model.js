const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  warehouse: { type: String, default: "Main Warehouse" }, // New field
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);