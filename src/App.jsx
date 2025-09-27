import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./users/context/authcontext";

// Pages
import Register from "./users/pages/register/register";
import Login from "./users/pages/login/login";
import HelpdeskDashboard from "./users/pages/dashboard/dashboard";
import ProfilePage from "./users/pages/profile/profilepage";
import TicketsPage from "./users/pages/ticket_form/ticketpage";
import TicketFormPage from "./users/pages/ticket_form/ticketformpages";
import RaiseTicket from "./users/pages/tickets/raise_ticket";

// Layout (with Sidebar always shown)
import DashboardLayout from "./users/pages/dashboard/dashboard";

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Old dashboard route (if you still need it) */}
          <Route path="/helpdesk-dashboard" element={<HelpdeskDashboard />} />
          <Route path="/raise-ticket" element={<RaiseTicket />} />

          {/* Protected routes with Sidebar layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/ticket/new" element={<TicketFormPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Route>

          {/* Default route */}
          <Route path="/" element={<Register />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
