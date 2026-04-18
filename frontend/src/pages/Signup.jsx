import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card glass-form">
        <h1 className="section-title" style={{ marginTop: 0, marginBottom: "10px" }}>
          Create account
        </h1>
        <p className="muted-text" style={{ marginTop: 0, marginBottom: "24px" }}>
          Start tracking your subscriptions in one place.
        </p>

        {error && <p style={{ color: "#ffd6e7", marginBottom: "12px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="glass-input"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className="glass-input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="glass-button" style={{ width: "100%", marginTop: "4px" }}>
            Sign Up
          </button>
        </form>

        <p className="muted-text" style={{ marginTop: "18px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;