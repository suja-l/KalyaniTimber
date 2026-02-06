import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
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
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
            <input name="name" type="text" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Email</label>
            <input name="email" type="email" required className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800" onChange={handleChange} />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-4 top-8 text-stone-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest ml-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-4 top-8 text-stone-400 hover:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-amber-800 hover:bg-amber-700 font-bold rounded-2xl transition-all">
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-stone-500 text-sm">
          Already have an account? <Link to="/login" className="text-white hover:text-amber-500">Login</Link>
        </p>
      </div>
    </div>
  );
}