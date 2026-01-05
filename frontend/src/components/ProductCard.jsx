import React from "react";
import { useCart } from "../context/CartContext";
import {useNavigate} from "react-router-dom";

const ProductCard = ({ product }) => {

  const { addToCart } = useCart();
  const navigate = useNavigate(); // add this to redirect to cart from home while adding product

  const handleAddToCart = () => {
    addToCart(product);    // add item
    navigate("/cart");     // redirect to Cart page
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-all duration-300 w-72">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      {/* Product Details */}
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
      <p className="text-pink-600 font-bold text-lg mt-2">₹{product.price}</p>

      {/* Add to Cart Button */}
      <button
        className="mt-3 w-full bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition duration-300"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
