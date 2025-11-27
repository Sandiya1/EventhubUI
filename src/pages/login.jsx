import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = new URLSearchParams();
      payload.append("username", email);
      payload.append("password", password);

      const res = await api.post("/auth/token", payload);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "organizer") {
        window.location.href = "/organizer";
      } else {
        window.location.href = "/events";
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-black overflow-hidden font-[Poppins]">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 bg-[url('/assets/bg-main.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-black"></div>

      {/* MAIN SPLIT CARD*/}
      <div className="relative z-10 w-[85%] max-w-5xl h-[520px] flex rounded-3xl overflow-hidden
                      shadow-[0_0_50px_rgba(255,255,255,0.2)] bg-white/5 backdrop-blur-xl border border-white/20">

        {/* LEFT FORM */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 
                         bg-clip-text text-transparent">
            Log In
          </h1>

          {error && (
            <p className="text-red-400 bg-red-500/10 p-2 text-sm mb-3 border border-red-500/20 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

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

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-300 to-white 
                               text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:opacity-90">
              Log In
            </button>
          </form>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 relative flex flex-col justify-center items-center text-center">

          <div className="absolute inset-0 bg-[url('src/assets/b.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>

          <div className="relative z-10 px-10">
            <h2 className="text-3xl font-bold text-white/90 mb-3">
              Don’t Have an Account?
            </h2>

            <p className="text-gray-300 mb-6">Join EventHub today.</p>

            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl 
                         hover:bg-gray-200 transition shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Global input style */}
      <style>{`
        .inputBox {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          outline: none;
          transition: 0.3s;
        }
        .inputBox::placeholder {
          color: #aaa;
        }
        .inputBox:focus {
          border-color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}

export default login;
