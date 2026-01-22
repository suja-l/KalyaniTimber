// backend/models/product.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 }, // Ensure stock is defined
    warehouse: { type: String, default: "Main Yard" }, // Added warehouse field
    unit: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    tags: [String],
    specs: { type: Map, of: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;