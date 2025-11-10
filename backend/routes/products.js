// backend/routes/products.js (FIXED PATH)

const router = require("express").Router();
const path = require("path"); // <-- NEW IMPORT to fix pathing issues
let Product = require(path.join(__dirname, "..", "models", "product.model")); // <-- FIXED PATH LOGIC

// GET all products: GET /products/
// This route will now attempt to return the products array
router.route("/").get((req, res) => {
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
