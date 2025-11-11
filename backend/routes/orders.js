// backend/routes/orders.js

const router = require("express").Router();
const path = require("path");
let Order = require(path.join(__dirname, "..", "models", "order.model"));

// --- GET all orders ---
// Route: GET /orders/
router.route("/").get((req, res) => {
  Order.find()
    // Sort by most recent first
    .sort({ createdAt: -1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

// --- UPDATE an order (e.g., change status) ---
// Route: PUT /orders/:id
router.route("/:id").put((req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res.status(404).json("Error: Order not found");
      }
      res.json(updatedOrder);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// --- (Optional) GET a single order by ID ---
// Route: GET /orders/:id
router.route("/:id").get((req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json("Error: Order not found");
      }
      res.json(order);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;