import { Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./users/components/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/raise-ticket" element={<RaiseTicket />} />
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ticket/new" element={<TicketFormPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/ticket-details" element={<TicketDetailPage />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
        </Route>

        {/* Optional old route */}
        <Route path="/helpdesk-dashboard" element={<HelpdeskDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
