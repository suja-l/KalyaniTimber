import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/reset-password-final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        alert("Password reset successful! Redirecting to login...");
        navigate("/login");
      } else {
        const err = await response.json();
        alert(err);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="w-full max-w-md p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-6">
          
          <div className="relative">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-8 text-stone-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-amber-800 hover:bg-amber-700 font-bold rounded-2xl transition-all">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}