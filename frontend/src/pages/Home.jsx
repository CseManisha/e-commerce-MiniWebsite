import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);

  // ✅ reusable function
  const fetchAllProducts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  };

  // Load all products initially
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      {/* ✅ pass BOTH props */}
      <Navbar
        setProducts={setProducts}
        fetchAllProducts={fetchAllProducts}
      />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className=" w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
            🛍️ Our Products
          </h1>

          {products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No products found
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5  gap-3 sm:gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
