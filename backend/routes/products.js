// backend/routes/products.js

const router = require("express").Router();
let Product = require("../models/product.model"); // This imports your product.model.js

// GET all products: GET /products/
// This handles the request you just tried in your browser
router.route("/").get((req, res) => {
  // Mongoose finds all documents in the 'products' collection
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ADD a new product: POST /products/add
router.route("/add").post((req, res) => {
  const { name, category, price, unit, description, imageUrl, tags, specs } =
    req.body;

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
