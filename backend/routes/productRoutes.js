const express = require("express");
const Product = require("../models/product");

const router = express.Router();


// ✅ ADD NEW PRODUCT
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





// ✅ GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 // ✅ GET ALL PRODUCTS + SEARCH
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      name: { $regex: search, $options: "i" }, // case-insensitive search
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
