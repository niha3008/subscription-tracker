import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card glass-form">
        <h1 className="section-title" style={{ marginTop: 0, marginBottom: "10px" }}>
          Welcome back
        </h1>
        <p className="muted-text" style={{ marginTop: 0, marginBottom: "24px" }}>
          Sign in to continue managing your subscriptions.
        </p>

        {error && <p style={{ color: "#ffd6e7", marginBottom: "12px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="glass-input"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="glass-input"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="glass-button" style={{ width: "100%", marginTop: "4px" }}>
            Log In
          </button>
        </form>

        <p className="muted-text" style={{ marginTop: "18px", textAlign: "center" }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;