import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


const Checkout = () => {

  const { cart } = useCart();
  const {user} = useAuth();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {

    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user_id,
          products: cart.map((item) => ({
            product: item._id,
            quantity: 1,
          })),
          totalPrice: total,
        }),
      });

      
      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
      
      console.log("Order placed:", data);
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("❌ Error placing order. Check the console for details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">🛒 Your cart is empty!</p>
      ) : (
        <>
          <ul className="text-left mb-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between py-2 border-b border-gray-100"
              >
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-gray-600">₹{item.price}</span>
              </li>
            ))}
          </ul>

          <p className="text-xl font-semibold text-gray-800 mb-4">
            Total: ₹{total}
          </p>

          <button
            onClick={handleCheckout}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-md transition-all duration-200"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
