import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity,0);

  const handleCheckout = async () => {
    const res = await fetch( `${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include",   // check session
    });

    if (res.status === 401) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">No items in your cart</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <hr className="my-4" />

          <h3 className="text-xl font-semibold">Total: ₹{total}</h3>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
