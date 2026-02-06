import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //

export default function ResetPassword() {
  const { token } = useParams(); //
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/reset-password-final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        alert("Password reset successful! Redirecting to login...");
        navigate("/login"); //
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
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">New Password</h2>
        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="password"
            required
            placeholder="Enter new password"
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-amber-800 hover:bg-amber-700 font-bold rounded-2xl transition-all"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}