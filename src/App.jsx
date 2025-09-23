import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./users/register/register";
import Login from "./users/login/login";
import HelpdeskDashboard from "./users/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: "20px" }}>
        {/* Navigation Links */}
        {/* <Link to="/register" style={{ marginRight: "10px" }}>
          Register
        </Link>
        <Link to="/login">Login</Link> */}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/helpdesk-dashboard" element={<HelpdeskDashboard />} />

        {/* Default route */}
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


