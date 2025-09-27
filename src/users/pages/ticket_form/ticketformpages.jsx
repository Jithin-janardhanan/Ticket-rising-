// pages/TicketFormPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/authcontext";
import { createTicket } from "../../services/userservices";
import "./ticketformstyle.css"


function TicketFormPage() {
  const { authToken } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(authToken, subject, description, file);
    setSubject("");
    setDescription("");
    setFile(null);
    alert("Ticket submitted successfully!");
  };

  return (
    <div className="ticket-form-page">
  <h2>Submit a Ticket</h2>
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
    <textarea placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button type="submit">Submit Ticket</button>
  </form>
</div>

  );
}

export default TicketFormPage;
