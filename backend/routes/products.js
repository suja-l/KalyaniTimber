// backend/routes/products.js (Complete CRUD Logic)

const router = require("express").Router();
const path = require("path");
// Uses the correct path to your model file
let Product = require(path.join(__dirname, "..", "models", "product.model"));

// --- GET all products: GET /products/ ---
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// --- ADD a new product: POST /products/add ---
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
    .then((product) => res.json(product)) // Return the saved product with its new _id
    .catch((err) => res.status(400).json("Error: " + err));
});

// --- NEW FIX: UPDATE (PUT) a product by ID ---
// Route: PUT /products/:id
router.route("/:id").put((req, res) => {
  // findByIdAndUpdate finds the document, updates it with req.body,
  // and returns the updated document ({ new: true })
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json("Error: Product not found");
      }
      res.json(updatedProduct); // Returns the updated product
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// --- NEW FIX: DELETE a product by ID ---
// Route: DELETE /products/:id
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product successfully deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
