// src/Pages/LoginPage/ForgotPassword.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful! Please login.");
        navigate("/login");
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Reset failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f0f0f]">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px]"></div>
      
      <div className="relative w-full max-w-md mx-4 z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Reset Password</h2>
            <p className="text-stone-400 font-medium">Enter your email and new password</p>
          </div>

          <form onSubmit={handleReset} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-amber-800"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">New Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-amber-800"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-800 hover:bg-amber-700 disabled:bg-stone-800 text-white font-bold rounded-2xl transition-all"
            >
              {loading ? "Processing..." : "Update Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-stone-500 hover:text-white text-sm transition">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}