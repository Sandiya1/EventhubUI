import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


import sideBg from "../assets/b.jpg";

export default function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("participant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", { name, email, role, password });
      setSuccess("Account created successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-black overflow-hidden font-[Poppins]">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"

      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black"></div>

      <div className="relative z-10 w-full max-w-5xl h-[520px] flex rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] bg-white/5 backdrop-blur-xl border border-white/20">

        {/* Left */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Create Account
          </h1>

          {error && (
            <p className="text-red-400 bg-red-500/10 p-2 text-sm mb-3 border border-red-500/20 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-400 bg-green-500/10 p-2 text-sm mb-3 border border-green-500/20 rounded">
              {success}
            </p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="inputBox"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="inputBox"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="inputBox"
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="inputBox text-black"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-300 to-white text-black font-semibold shadow-xl hover:opacity-90">
              Sign Up
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="w-1/2 relative flex flex-col justify-center items-center text-center">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${sideBg})` }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>

          <div className="relative z-10 px-10">
            <h2 className="text-3xl font-bold text-white/90 mb-3">
              Already Have an Account?
            </h2>

            <Link
              to="/login"
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition"
            >
              Log In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
