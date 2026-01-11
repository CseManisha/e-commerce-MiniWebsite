import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch( `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            credentials: "include", // session cookie
          }
        );

        if (!res.ok) {
          throw new Error("Not authorized");
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <p className="font-semibold">
              Order ID: <span className="text-gray-600">{order._id}</span>
            </p>

            <p className="text-sm text-gray-500">
              Status: <span className="font-medium">{order.status}</span>
            </p>

            <ul className="mt-2">
              {order.products.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between text-sm py-1"
                >
                  <span>{item.product.name}</span>
                  <span>₹{item.product.price}</span>
                </li>
              ))}
            </ul>

            <p className="font-bold mt-2">
              Total: ₹{order.totalPrice}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
