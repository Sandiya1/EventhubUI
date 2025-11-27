import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import bg from "../assets/bg.jpg";

function EditEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const formattedDate = data.event_date
          ? data.event_date.slice(0, 16)
          : "";

        setEvent({
          ...data,
          event_date: formattedDate,
        });
      })
      .catch(() => setError("Failed to load event"));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const token = localStorage.getItem("token");

    try {
      await api.put(
        `/events/update/${id}`,
        {
          title: event.title,
          description: event.description,
          venue: event.venue,
          speaker: event.speaker,
          event_date: event.event_date,
          total_seats: Number(event.total_seats),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMsg("Event updated successfully!");

      setTimeout(() => {
        window.location.href = "/organizer";
      }, 1200);
    } catch (err) {
      setError("Failed to update event");
    }
  };

  if (!event) return <p className="text-center text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black relative font-[Poppins] overflow-hidden">

      {/* Background Image */}
      <div 
  className="absolute inset-0 bg-cover bg-center opacity-20"
  style={{ backgroundImage: `url(${bg})` }}
></div>

      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black"></div>

      {/* Landscape Card */}
      <div className="relative z-10 w-[85%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/15 
                      rounded-3xl p-10 shadow-[0_0_45px_rgba(255,255,255,0.2)] animate-fadeIn">

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-300 hover:text-white underline mb-6"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent 
                       bg-gradient-to-r from-white to-gray-400 mb-6 tracking-wide">
          Edit Event
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

        {/* FORM - EXACT same layout as Create Event */}
        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Event Title"
            className="inputBox"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Speaker"
            className="inputBox"
            value={event.speaker}
            onChange={(e) => setEvent({ ...event, speaker: e.target.value })}
          />

          <input
            type="text"
            placeholder="Venue"
            className="inputBox"
            value={event.venue}
            onChange={(e) => setEvent({ ...event, venue: e.target.value })}
          />

          <input
            type="datetime-local"
            className="inputBox calendarInput"
            value={event.event_date}
            onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
          />

          <textarea
            placeholder="Event Description"
            className="inputBox col-span-2 h-28 resize-none"
            value={event.description || ""}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
          ></textarea>

          <input
            type="number"
            placeholder="Total Seats"
            className="inputBox col-span-2"
            value={event.total_seats}
            onChange={(e) => setEvent({ ...event, total_seats: e.target.value })}
          />

          <button className="col-span-2 w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-gray-300 to-white 
                             text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:opacity-90">
            Update Event
          </button>
        </form>
      </div>

      {/* STYLES */}
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
        .inputBox:focus { border-color: rgba(255,255,255,0.35); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out forwards; }
      `}</style>

    </div>
  );
}

export default EditEvent;