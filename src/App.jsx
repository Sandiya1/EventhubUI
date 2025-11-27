import { BrowserRouter, Routes, Route } from "react-router-dom";
import login from "./pages/login";
import signup from "./pages/signup";
import Events from "./pages/Events"; // later
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyRegistrations from "./pages/MyRegistrations";
import LandingPage from "./pages/LandingPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/" element={<LandingPage />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App; 
