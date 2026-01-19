import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-pink-600 font-bold">
            ₹{item.price * item.quantity}
          </p>

          {/* Quantity buttons */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => decreaseQty(item._id)}
              className="px-2 bg-gray-200 rounded"
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => increaseQty(item._id)}
              className="px-2 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
