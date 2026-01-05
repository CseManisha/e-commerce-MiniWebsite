import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-500 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 gap-4">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold">MiniShop</h2>
          <p className="text-pink-100 mt-1 text-xs">
            Simple • Secure • Fast shopping experience
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-1">Quick Links</h3>
          <ul className="space-y-1 text-pink-100  text-xs">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-pink-100 text-sm">Email: support@minishop.com</p>
          <p className="text-pink-100 text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-pink-600 text-center py-3 text-sm">
        © {new Date().getFullYear()} MiniShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
