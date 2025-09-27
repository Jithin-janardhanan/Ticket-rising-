// pages/TicketsPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext";
import { getProfile } from "../../services/userservices";
import "./ticketpagestyle.css"

function TicketsPage() {
  const { authToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (authToken) {
      getProfile(authToken).then((data) => setTickets(data.complaints || []));
    }
  }, [authToken]);

  return (
    <div className="tickets-page">
  <h2>Previous Tickets</h2>
  {tickets.length === 0 ? (
    <p className="no-tickets">No tickets found.</p>
  ) : (
    tickets.map((ticket) => (
      <div key={ticket.id} className="ticket-item">
        <h3>{ticket.subject}</h3>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p>Created At: {new Date(ticket.created_at).toLocaleString()}</p>
      </div>
    ))
  )}
</div>

  );
}

export default TicketsPage;
