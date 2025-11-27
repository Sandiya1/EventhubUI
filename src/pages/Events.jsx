import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);

  const role = localStorage.getItem("role");
  if (role === "organizer") window.location.href = "/organizer";

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/events/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Error fetching events:", err));
  }, []);

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        `/events/register/${eventId}?seats=1`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg);
      window.location.reload();
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (detail === "This event is already completed. Registration is closed.") {
        alert("This event is already completed — you cannot register.");
      } else if (detail === "Not enough seats available") {
        alert("This event is full.");
      } else if (detail === "Already registered for this event") {
        alert("You already registered.");
      } else {
        alert(detail || "Registration failed");
      }
    }
  };

  const getBadge = (ev) => {
    const now = new Date();
    const eventTime = new Date(ev.event_date);

    if (eventTime < now) {
      return (
        <span className="badge bg-white/10 text-gray-300 border border-white/20">
          Completed
        </span>
      );
    }

    const hoursLeft = (eventTime - now) / (1000 * 60 * 60);

    if (hoursLeft <= 24) {
      return (
        <span className="badge bg-orange-400/20 text-orange-300 border border-orange-400/30">
          Soon
        </span>
      );
    }

    if (ev.seats_available <= 0) {
      return (
        <span className="badge bg-red-500/20 text-red-300 border border-red-500/30">
          Full
        </span>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-y-auto scroll-smooth font-[Poppins]">

      {/* Background image + gradient */}
      <div className="absolute inset-0 bg-[url('src/assets/bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black"></div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 p-8 animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 animate-slideDown">
          <h1 className="text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Available Events
          </h1>

          <div className="flex gap-4">
            <a
              href="/my-registrations"
              className="navBtn bg-white/10 hover:bg-white/20"
            >
              My Registrations
            </a>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/";
              }}
              className="navBtn bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>

        {/* EVENT CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {events.map((ev, index) => {
            const now = new Date();
            const isCompleted = new Date(ev.event_date) < now;

            return (
              <div
                key={ev.id}
                className={`cardGlass animate-fadeUp delay-${index * 100} ${
                  isCompleted ? "opacity-50" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">{ev.title}</h2>
                  {getBadge(ev)}
                </div>

                <p className="text-gray-400">Venue: {ev.venue}</p>
                <p className="text-gray-400">Speaker: {ev.speaker}</p>

                <p className="mt-2 text-gray-300">
                  Date:{" "}
                  <span className="text-white">
                    {new Date(ev.event_date).toLocaleString()}
                  </span>
                </p>

                <p className="font-semibold text-sky-300 mt-3">
                  Seats Available: {ev.seats_available}
                </p>

                <button
                  disabled={isCompleted || ev.seats_available <= 0}
                  onClick={() => handleRegister(ev.id)}
                  className={`btnPrimary mt-6 ${
                    isCompleted || ev.seats_available <= 0
                      ? "btnDisabled"
                      : ""
                  }`}
                >
                  {isCompleted ? "Completed" : ev.seats_available <= 0 ? "Full" : "Register"}
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* STYLES */}
      <style>{`
        .cardGlass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 24px;
          transition: 0.3s;
          box-shadow: 0 0 25px rgba(255,255,255,0.1);
        }
        .cardGlass:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 0 40px rgba(255,255,255,0.2);
        }

        .badge {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
        }

        .navBtn {
          padding: 10px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: 0.3s;
        }

        .btnPrimary {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          transition: 0.3s;
        }
        .btnPrimary:hover {
          background: rgba(255,255,255,0.2);
        }
        .btnDisabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Animations */
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0; transform:translateY(-20px)} to{opacity:1; transform:translateY(0)} }

        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fadeUp { animation: fadeUp 0.8s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Events;
