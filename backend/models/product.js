// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL or local path to product image
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
