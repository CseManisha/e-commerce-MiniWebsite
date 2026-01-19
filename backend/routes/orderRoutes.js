const express = require("express");
const Order = require("../models/order");
const isLoggedIn = require("../middleware/isLoggedIn")

const router = express.Router();

// ✅ CREATE A NEW ORDER
router.post("/",isLoggedIn, async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    const newOrder = new Order({
      user,
      products,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ GET ALL ORDERS (for admin or testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email") // show user info
      .populate("products.product", "name price"); // show product info
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ORDERS BY USER ID
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE ORDER STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE ORDER (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
