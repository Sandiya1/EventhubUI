import { useEffect, useState } from "react";
import api from "../services/api";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const role = localStorage.getItem("role");
  if (role !== "participant") window.location.href = "/events";

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/events/my/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRegistrations(res.data.registered_events || []);
      })
      .catch((err) => console.log("Error loading registrations:", err));
  }, []);

  const handleCancel = async (eventId) => {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to cancel your registration?")) return;

    try {
      const res = await api.delete(`/events/cancel/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.msg);

      setRegistrations((prev) =>
        prev.filter((r) => r.event_id !== eventId)
      );
    } catch (err) {
      alert(err.response?.data?.detail || "Cancellation failed");
    }
  };

  const getBadge = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);

    if (eventDate < now) {
      return (
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
          Completed
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen w-full relative bg-black text-white font-[Poppins] overflow-x-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('src/assets/bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black"></div>

      {/* CONTENT */}
      <div className="relative z-10 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 animate-slideDown">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent 
                         bg-gradient-to-r from-white to-gray-400 drop-shadow-lg tracking-wide">
            My Registrations
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
              }}
              className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 
                         hover:bg-red-500/30 transition shadow-[0_0_15px_rgba(255,0,0,0.25)]"
            >
              Logout
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-200 
                         hover:bg-white/20 transition shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* EMPTY STATE */}
        {registrations.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 text-lg">
            You haven't registered for any events yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {registrations.map((r, index) => {
              const isCompleted = new Date(r.date) < new Date();

              return (
                <div
                  key={r.event_id}
                  className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
                              shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-[1.02] 
                              hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300
                              animate-fadeUp`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* TITLE + BADGE */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold tracking-wide text-white/90">
                      {r.title}
                    </h2>
                    {getBadge(r.date)}
                  </div>

                  <p className="text-gray-400">Venue: {r.venue}</p>
                  <p className="text-gray-400">Speaker: {r.speaker}</p>

                  <p className="text-gray-300 mt-3">
                    Date:&nbsp;
                    <span className="text-white font-medium">
                      {new Date(r.date).toLocaleString()}
                    </span>
                  </p>

                  {/* CANCEL BUTTON */}
                  <button
                    disabled={isCompleted}
                    onClick={() => handleCancel(r.event_id)}
                    className={`mt-6 w-full py-3 rounded-xl text-red-300 border border-red-500/30 
                      shadow-[0_0_15px_rgba(255,0,0,0.25)] transition 
                      ${isCompleted
                        ? "bg-gray-600/20 cursor-not-allowed opacity-40"
                        : "bg-red-500/20 hover:bg-red-500/30"}
                    `}
                  >
                    {isCompleted ? "Event Completed" : "Cancel Registration"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.7s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MyRegistrations;
