// backend/routes/products.js
const router = require("express").Router();
const path = require("path");
let Product = require(path.join(__dirname, "..", "models", "product.model"));

// GET all products
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// NEW: Update Stock and Warehouse specifically
router.route("/inventory/:id").patch((req, res) => {
  const { stock, warehouse } = req.body;

  Product.findByIdAndUpdate(
    req.params.id,
    { $set: { stock: Number(stock), warehouse: warehouse } },
    { new: true, runValidators: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json("Error: Product not found");
      }
      res.json(updatedProduct);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET a single product by ID
router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) return res.status(404).json("Error: Product not found");
      res.json(product);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// General UPDATE (PUT) a product
router.route("/:id").put((req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE a product
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product successfully deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;