import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.1.5:8003/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login success:", data);

      // Save the access token
      if (data.access) {
        localStorage.setItem("authToken", data.access);
      }

      // Optionally store refresh token if you plan to refresh later
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      // Clear form
      clearForm();

      // Navigate to Helpdesk Dashboard
      navigate("/helpdesk-dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h2 className="login-title">Login</h2>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="button" onClick={clearForm} className="btn btn-secondary">Clear</button>
            </div>
          </form>
        </div>

        <div className="register-link">
          <p className="register-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
