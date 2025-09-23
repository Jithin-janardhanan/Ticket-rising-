// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./dashboard.css";

// function HelpdeskDashboard() {
//   const navigate = useNavigate();
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null); // For modal

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       alert("Unauthorized! Please login again.");
//       navigate("/login");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("subject", subject);
//     formData.append("description", description);
//     if (file) formData.append("image", file);

//     try {
//       const res = await fetch(
//         "http://192.168.1.5:8003/api/tickets/complaints/create/",
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         }
//       );
//       if (!res.ok) throw new Error("Failed to create ticket");
//       alert("Ticket submitted successfully");
//       setSubject("");
//       setDescription("");
//       setFile(null);
//       fetchTickets();
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting ticket");
//     }
//   };

//   const fetchTickets = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) return;
//     try {
//       const res = await fetch(
//         "http://192.168.1.5:8003/api/tickets/complaints/",
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to fetch tickets");
//       const data = await res.json();
//       setTickets(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   return (
//     <div className="dashboard-layout">
//       <aside className="dashboard-sidebar">
//         <div className="sidebar-header">TechFifo Helpdesk</div>
//         <nav className="sidebar-nav">
//           <button>Submit Ticket</button>
//           <button>Previous Tickets</button>
//         </nav>
//         <button className="btn-logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </aside>

//       <main className="dashboard-main">
//         {/* Ticket form */}
//         <div className="ticket-form-container">
//           <h2>Submit a Ticket</h2>
//           <form className="ticket-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Enter Subject"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Enter Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             <button type="submit" className="btn-submit">
//               Submit Ticket
//             </button>
//           </form>
//         </div>

//         {/* Ticket list */}
//         <div className="ticket-list-container">
//           <h2>Previous Tickets</h2>
//           {tickets.length === 0 ? (
//             <p>No tickets found.</p>
//           ) : (
//             tickets.map((ticket) => (
//               <div key={ticket.id} className="ticket-item">
//                 <h3>{ticket.subject}</h3>
//                 <p><strong>Status:</strong> {ticket.status}</p>
//                 <p style={{ fontSize: "0.85rem", color: "#777" }}>
//                   Created At: {new Date(ticket.created_at).toLocaleString()}
//                 </p>
//                 <button
//                   className="btn-view"
//                   onClick={() => setSelectedTicket(ticket)}
//                 >
//                   View
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Modal for viewing ticket */}
//         {selectedTicket && (
//           <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <h3>{selectedTicket.subject}</h3>
//               <p><strong>Status:</strong> {selectedTicket.status}</p>
//               <p><strong>Description:</strong> {selectedTicket.description}</p>
//               {selectedTicket.image && (
//                 <img
//                   src={selectedTicket.image}
//                   alt="ticket"
//                   className="modal-image"
//                 />
//               )}
//               <p style={{ fontSize: "0.85rem", color: "#777" }}>
//                 Created At: {new Date(selectedTicket.created_at).toLocaleString()}
//               </p>
//               <button className="btn-close" onClick={() => setSelectedTicket(null)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default HelpdeskDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function HelpdeskDashboard() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [profile, setProfile] = useState(null);

  // Logout
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.5:8003/api/users/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during logout");
    }
  };

  // Fetch profile & complaints
  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch("http://192.168.1.5:8003/api/tickets/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setProfile(data);
      setTickets(data.complaints); // only complaints
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">TechFifo Helpdesk</div>
        <nav className="sidebar-nav">
          <button>Submit Ticket</button>
          <button>Previous Tickets</button>
        </nav>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        {/* Ticket form */}
        <div className="ticket-form-container">
          <h2>Submit a Ticket</h2>
          <form
            className="ticket-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const token = localStorage.getItem("authToken");
              if (!token) {
                alert("Unauthorized!");
                navigate("/login");
                return;
              }
              const formData = new FormData();
              formData.append("subject", subject);
              formData.append("description", description);
              if (file) formData.append("image", file);

              try {
                const res = await fetch(
                  "http://192.168.1.5:8003/api/tickets/complaints/create/",
                  {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  }
                );
                if (!res.ok) throw new Error("Failed to create ticket");
                setSubject("");
                setDescription("");
                setFile(null);
                fetchProfile(); // refresh tickets
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <input
              type="text"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit" className="btn-submit">
              Submit Ticket
            </button>
          </form>
        </div>

<main className="dashboard-main">
  {/* Ticket form */}
  {/* <div className="ticket-form-container"> ... </div> */}

  {/* Profile info */}
  {profile && (
    <div className="profile-info">
      <h3>Profile Information</h3>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone_number}</p>
      <p><strong>Total Complaints:</strong> {profile.complaints.length}</p>
    </div>
  )}

  {/* Ticket list */}
  {/* <div className="ticket-list-container"> ... </div> */}
</main>

        {/* Ticket list */}
        <div className="ticket-list-container">
          <h2>Previous Tickets</h2>
          {tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-item">
                <h3>{ticket.subject}</h3>
                <p>
                  <strong>Status:</strong> {ticket.status}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#777" }}>
                  Created At: {new Date(ticket.created_at).toLocaleString()}
                </p>
                <button
                  className="btn-view"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {selectedTicket && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{selectedTicket.subject}</h3>
              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Description:</strong> {selectedTicket.description}
              </p>
              {selectedTicket.image && (
                <img
                  src={selectedTicket.image}
                  alt="ticket"
                  className="modal-image"
                />
              )}
              <p style={{ fontSize: "0.85rem", color: "#777" }}>
                Created At:{" "}
                {new Date(selectedTicket.created_at).toLocaleString()}
              </p>
              <button
                className="btn-close"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HelpdeskDashboard;
