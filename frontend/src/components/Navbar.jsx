import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// for icon
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";





const Navbar = ({ setProducts , fetchAllProducts}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name || user?.username || user?.email;

  const [query, setQuery] = useState("")

  // Logout logic
  const handleLogout = async () => {
    await fetch( `${import.meta.env.VITE_API_URL}/api/auth/logout`,
       {
        method:"POST", // IMPORT  for logout
      credentials: "include", // keep session cookie
    }); 

    setUser(null);
    navigate("/login");
    setIsOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?search=${query}`
      );
      const data = await res.json();
      setProducts(data);
      // go back to home
      navigate("/")
    } catch (error) {
      console.error("Search failed", error);
    }
  }

  return (
    <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <h2 className="text-white text-2xl font-bold tracking-wide">MiniShop</h2>

        {user && (
          <div className="hidden md:flex items-center gap-1 text-white text-sm bg-pink-400/40 px-3 py-1 rounded-md">
            <UserIcon className="h-4 w-4" />
            Hi, <b>{displayName}</b>
          </div>
        )}
    
    <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full px-3 py-2 mx-3 w-full max-w-[180px] md:max-w-md"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-sm md:text-base outline-none"
        />
      </form>

      {/* RIGHT: MENU / USER ICONS */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white md:hidden"
      >
        <Bars3Icon className="w-7 h-7" />
      </button>
        

        

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">

          <Link
            to="/"
            onClick={()=>{
              fetchAllProducts();
              setIsOpen(false)
            }}
            className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:text-pink-200"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:text-pink-200"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Cart
          </Link>

          {user ? (
            <>
              {/* login status */}




              <Link
                to="/orders"
                className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:text-pink-200"
              >
                <ClipboardDocumentListIcon className="h-4 w-4" />
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:bg-pink-200"
              >
                <UserIcon className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:text-pink-200"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1 text-white px-4 py-1 rounded-md hover:text-pink-200"
              >
                <UserPlusIcon className="h-4 w-4" />
                Register
              </Link>
            </>
          )}
        </div>


        {/* Mobile Dropdown */}
        <div

          className={`absolute right-4 top-14 bg-white text-pink-600 rounded-lg shadow-lg flex flex-col p-4 space-y-3 w-44 md:hidden transition-all duration-300 origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
        >
         

          {user && (
            <div className="border-b pb-2 mb-2 text-sm font-medium">
              👋 Hi, <span className="font-semibold">{displayName}</span>
            </div>
          )}



          <Link
            to="/"
            onClick={()=>{
              fetchAllProducts();
              setIsOpen(false)
            }}
            className="flex items-center gap-2 hover:text-pink-400"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:text-pink-400"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Cart
          </Link>

          {user ? (
            <>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <ClipboardDocumentListIcon className="h-4 w-4" />
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-left hover:text-pink-400"
              >
                <UserIcon className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <UserPlusIcon className="h-4 w-4" />
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
