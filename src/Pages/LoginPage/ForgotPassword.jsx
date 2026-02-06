import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/forgot-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message || data);
    } catch (err) {
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <form onSubmit={handleRequest} className="bg-white/5 p-10 rounded-3xl border border-white/10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-stone-400 mb-6">Enter your email to receive a reset link.</p>
        <input 
          type="email" 
          required 
          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button disabled={loading} className="w-full py-3 bg-amber-800 rounded-xl">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}