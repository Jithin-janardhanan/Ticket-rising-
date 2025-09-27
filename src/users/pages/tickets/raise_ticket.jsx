import { useState } from "react";
import { raiseTicket } from "../../services/userservices"; // import service
import "./raise_ticket.css";

function RaiseTicket() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    description: "",
    designation_id: "",
    subject: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await raiseTicket(formData, file);
      setMessage("Ticket raised successfully!");

      // reset
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        description: "",
        designation_id: "",
        subject: "",
      });
      setFile(null);
    } catch (error) {
      setMessage("Failed to raise ticket. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="ticket-container">
      <div className="ticket-wrapper">
        <h2 className="ticket-title">Raise a Complaint Ticket</h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          <input
            type="text"
            name="customer_name"
            placeholder="Your Name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="customer_email"
            placeholder="Your Email"
            value={formData.customer_email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="customer_phone"
            placeholder="Phone Number"
            value={formData.customer_phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="designation_id"
            placeholder="Designation ID"
            value={formData.designation_id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input type="file" onChange={handleFileChange} />
          {file && <p className="file-name">Selected: {file.name}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
        {message && <p className="ticket-message">{message}</p>}
      </div>
    </div>
  );
}

export default RaiseTicket;
 