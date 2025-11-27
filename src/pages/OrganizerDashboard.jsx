import { useEffect, useState } from "react";
import api from "../services/api";

function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const role = localStorage.getItem("role");
  if (role !== "organizer") window.location.href = "/events";

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/events/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Error fetching events:", err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => prev.filter((e) => e.id !== id));
      alert("Event deleted!");
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const fetchParticipants = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get(`/events/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setParticipants(res.data);
      setShowModal(true);

    } catch (err) {
      console.log("PARTICIPANTS ERROR:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-y-auto 
                    font-[Poppins] scroll-smooth">

      {/* BACKGROUND IMAGE + DARK OVERLAY */}
      <div className="fixed inset-0 bg-[url('src/assets/bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black/40 to-black"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 p-12">

        {/* HEADER + LOGOUT */}
        <div className="flex justify-between items-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent 
                         bg-gradient-to-r from-white to-gray-300 tracking-wide drop-shadow-xl">
            Organizer Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            className="px-6 py-2 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 
                       hover:bg-red-500/30 shadow-[0_0_15px_rgba(255,0,0,0.25)] transition"
          >
            Logout
          </button>
        </div>

        {/* CREATE EVENT BUTTON */}
        <div className="flex justify-end mb-12 animate-slideUp">
          <a
            href="/create-event"
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                       shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/20 transition"
          >
            + Create Event
          </a>
        </div>

        {/* EVENT CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              style={{ animationDelay: `${idx * 120}ms` }}
              className="animate-fadeUp bg-white/5 backdrop-blur-xl border border-white/10 
                         rounded-2xl p-6 shadow-[0_0_25px_rgba(255,255,255,0.1)]
                         hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]
                         transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white/90 mb-2 tracking-wide">
                {ev.title}
              </h2>

              <p className="text-gray-400 mb-2">{ev.description}</p>
              <p className="text-gray-400">Venue: {ev.venue}</p>
              <p className="text-gray-400">Speaker: {ev.speaker}</p>

              <p className="text-gray-300 mt-3">
                {new Date(ev.event_date).toLocaleString()}
              </p>

              <p className="mt-3 font-semibold text-sky-300 tracking-wide">
                Seats: {ev.seats_available} / {ev.total_seats}
              </p>

              <div className="flex gap-2 mt-6">

                <a
                  href={`/edit-event/${ev.id}`}
                  className="flex-1 px-4 py-2 rounded-xl bg-yellow-500/20 border 
                             border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/30 
                             transition text-center shadow-[0_0_10px_rgba(255,255,0,0.15)]"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/30 
                             text-red-300 hover:bg-red-500/30 transition shadow-[0_0_10px_rgba(255,0,0,0.2)]"
                >
                  Delete
                </button>

                <button
                  onClick={() => fetchParticipants(ev.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 
                             text-white hover:bg-white/20 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  Participants
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* PARTICIPANTS MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center 
                          items-center p-6 animate-fadeInModal">
            <div className="w-full max-w-md bg-white/5 rounded-2xl border border-white/10 
                            p-6 shadow-[0_0_35px_rgba(255,255,255,0.25)] animate-scaleIn">

              <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent 
                             bg-gradient-to-r from-white to-gray-300 tracking-wide">
                Participants
              </h2>

              {participants.length === 0 ? (
                <p className="text-gray-300 text-center">No participants yet.</p>
              ) : (
                <div className="space-y-3">
                  {participants.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/10 border border-white/10"
                    >
                      <p className="text-gray-100 font-semibold">{p.participant}</p>
                      <p className="text-gray-400 text-sm">{p.email}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 
                           border border-white/20 text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ANIMATIONS */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.9s ease-out forwards;
        }
        .animate-fadeUp {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease-out forwards;
        }
        .animate-fadeInModal {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default OrganizerDashboard;
