const router = require("express").Router();
const Product = require("../models/product.model");

// Update stock and warehouse
router.patch("/update-stock/:id", async (req, res) => {
  try {
    const { stock, warehouse } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { stock, warehouse } },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;