// backend/models/product.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: [String],
    specs: {
      density: { type: String },
      origin: { type: String },
      grade: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
