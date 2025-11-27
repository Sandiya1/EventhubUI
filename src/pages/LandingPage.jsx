import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg"; // <-- your background image

function LandingPage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND IMAGE WITH CINEMATIC ZOOM */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bgMove"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* BLACK GRADIENT OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black/80 to-black"></div>
      

      {/* SILVER GLOW HIGHLIGHT */}
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light 
                      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)] 
                      animate-pulse-slow"></div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-12 py-6 bg-black/20 backdrop-blur-md border-b border-white/10">
          <h1 className="text-3xl font-extrabold tracking-wide text-silver drop-shadow-lg">
            EventHub
          </h1>

          <div className="flex gap-8 text-lg">
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/signup" className="hover:text-gray-300 transition">Signup</Link>
          </div>
        </nav>

        {/* HERO */}
        <div className="flex flex-col justify-center items-center flex-grow text-center px-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-silver mb-6 drop-shadow-xl font-[Inter]">
  Welcome To,<br />
  EventHUB
</h1>


          <p className="text-gray-300 text-lg md:text-2xl max-w-2xl leading-relaxed mb-8">
            A unified platform for seamless event discovery and registration.  
            Connect, register, and experience more—effortlessly
          </p>

          <Link
            to="/login"
            className="px-10 py-4 rounded-lg bg-gradient-to-r from-gray-300 to-gray-500 text-black font-bold
                       shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>

      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>
        {`
          /* Slow zoom animation */
          .animate-bgMove {
            animation: bgMove 14s ease-in-out infinite alternate;
          }

          @keyframes bgMove {
            0% { transform: scale(1) translateY(0px); }
            100% { transform: scale(1.05) translateY(-25px); }
          }

          /* Soft pulsing silver glow */
          .animate-pulse-slow {
            animation: pulseSlow 6s ease-in-out infinite;
          }

          @keyframes pulseSlow {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.40; }
          }

          /* Silver color utility */
          .text-silver {
            color: #d8d8d8;
          }
        `}
      </style>
    </div>
  );
}

export default LandingPage;
