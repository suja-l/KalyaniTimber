// src/Pages/LoginPage/RegisterPage.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role for new sign-ups
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Registration failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f0f0f]">
      {/* Cinematic Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-stone-800/30 rounded-full blur-[150px]"></div>

      {/* Glassmorphism Register Card */}
      <div className="relative w-full max-w-md mx-4 z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Join Us</h2>
            <p className="text-stone-400 font-medium">Create your Kalyani Timber account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-800 transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-800 transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-800 transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-800 hover:bg-amber-700 disabled:bg-stone-800 text-white font-bold rounded-2xl shadow-xl transform transition active:scale-[0.98] flex justify-center items-center group mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-stone-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 hover:text-amber-500 font-bold transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}