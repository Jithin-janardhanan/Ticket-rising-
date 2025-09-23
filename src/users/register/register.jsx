
// export default Register;
import { useState } from "react";
import "./Register.css"; // 👈 Import the CSS file
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.1.5:8003/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number: phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Registration Successful!");

      // ✅ clear form after success
      clearForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Registration Failed!");
    }
  };

  return (
    // 👈 Use the CSS class name
   <div className="register-container">
 

  <form onSubmit={handleSubmit} className="register-form">
     <h2>Register</h2>
    <div className="form-group">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="register-button">
      Register
    </button>

    {/* 👇 Login link placed inside the form, below button */}
    <div className="login_link">
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  </form>
</div>

    

  );
}

export default Register;