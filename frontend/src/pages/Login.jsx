import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();// navigation 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");// clear old error

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",// important for session cookie
      body: JSON.stringify({
        username: email,
        password,
      }),
    });


    if (!res.ok) {
      setError("Invalid email or password");//....if it is true allow for login if not not allow for login
      return;// stop here
    }

    const data = await res.json();
    console.log("Login success:", data);


    const me = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: 'include',
    });

    const userData = await me.json();
    setUser(userData);//store user globally

    setEmail("");
    setPassword("");
    setError("");

    // redirect to checkout after login
    setTimeout(() => {
      navigate("/checkout");
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center" > {error} </p>  ///...
        )}

        {/* Email */}
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-pink-400 outline-none"
          autoCapitalize="off"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password */}
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-pink-400 outline-none"
          autoComplete="off"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
