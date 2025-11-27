import { useState } from "react";
import api from "../services/api";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/events/create",
        {
          title,
          description,
          venue,
          speaker,
          event_date: date,
          total_seats: Number(seats),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg("Event created successfully!");
    } catch (err) {
      setError("Failed to create event");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black relative font-[Poppins] overflow-hidden">

      {/* Background Image + Black Gradient */}
      <div className="absolute inset-0 bg-[url('src/assets/bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black"></div>

      {/* Landscape Card */}
      <div className="relative z-10 w-[85%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/15 
                      rounded-3xl p-10 shadow-[0_0_45px_rgba(255,255,255,0.2)] animate-fadeIn">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-300 hover:text-white underline mb-6"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent 
                       bg-gradient-to-r from-white to-gray-400 mb-6 tracking-wide">
          Create Event
        </h1>

        {msg && (
          <p className="text-green-400 text-center bg-green-500/10 p-2 border border-green-500/20 rounded mb-4">
            {msg}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center bg-red-500/10 p-2 border border-red-500/20 rounded mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleCreate} className="grid grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Event Title"
            className="inputBox"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Speaker"
            className="inputBox"
            onChange={(e) => setSpeaker(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Venue"
            className="inputBox"
            onChange={(e) => setVenue(e.target.value)}
            required
          />

          <input
            type="datetime-local"
            className="inputBox calendarInput"
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <textarea
            placeholder="Event Description"
            className="inputBox col-span-2 h-28 resize-none"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Total Seats"
            className="inputBox col-span-2"
            onChange={(e) => setSeats(e.target.value)}
            required
          />

          <button className="col-span-2 w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-gray-300 to-white 
                             text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:opacity-90">
            Create Event
          </button>
        </form>
      </div>

      {/* Styles */}
      <style>{`
        .inputBox {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          transition: 0.3s;
        }
        .inputBox::placeholder { color: #aaa; }
        .inputBox:focus {
          border-color: rgba(255,255,255,0.35);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
      `}</style>

    </div>
  );
}

export default CreateEvent;
