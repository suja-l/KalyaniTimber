// backend/routes/products.js

const router = require("express").Router();
let Product = require("../models/product.model");

// GET all products: GET /products/
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ADD a new product: POST /products/add
router.route("/add").post((req, res) => {
  // Basic validation and Mongoose model creation
  const { name, category, price, unit, description, imageUrl, tags, specs } =
    req.body;

  // Create new product instance
  const newProduct = new Product({
    name,
    category,
    price,
    unit,
    description,
    imageUrl,
    tags,
    specs,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
