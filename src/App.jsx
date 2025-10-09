import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./users/context/authcontext";
import Register from "./users/pages/register/register";
import Login from "./users/pages/login/login";
import HelpdeskDashboard from "./users/pages/dashboard/dashboard";
import ProfilePage from "./users/pages/profile/profilepage";
import TicketsPage from "./users/pages/ticket_form/ticketpage";
import TicketFormPage from "./users/pages/ticket_form/ticketformpages";
import RaiseTicket from "./users/pages/guest_tickets/raise_ticket";
import ForgotPassword from "./users/pages/forgotpassword/request_otp";
import DashboardLayout from "./users/pages/dashboard/dashboard";
import TicketDetailPage from "./users/pages/ticket_detials/ticket_details";

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Old dashboard route (if you still need it) */}
          <Route path="/helpdesk-dashboard" element={<HelpdeskDashboard />} />
          <Route path="/raise-ticket" element={<RaiseTicket />} />
          {/* Protected routes with Sidebar layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/ticket/new" element={<TicketFormPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
             <Route path="/ticketdetials" element={<TicketDetailPage />} />
             <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
          </Route>

          {/* Default route */}
          <Route path="/" element={<Login />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
