import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        EventHub
      </Link>

      {/* MENU ITEMS */}
      <div className="flex gap-6 text-gray-700 font-medium">

        {/* If NOT logged in */}
        {!token && (
          <>
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="hover:text-indigo-600">Signup</Link>
          </>
        )}

        {/* PARTICIPANT MENU */}
        {token && role === "participant" && (
          <>
            <Link to="/events" className="hover:text-indigo-600">Events</Link>
            <Link to="/my-registrations" className="hover:text-indigo-600">My Registrations</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </>
        )}

        {/* ORGANIZER MENU */}
        {token && role === "organizer" && (
          <>
            <Link to="/organizer" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/create-event" className="hover:text-indigo-600">Create Event</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
