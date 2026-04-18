import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.wrapper}>
      <div style={styles.inner} className="glass-card">
        <h2 style={styles.logo}>Subscription Tracker</h2>

        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <Link to="/subscriptions" style={styles.link}>Subscriptions</Link>
              <Link to="/subscriptions/add" style={styles.link}>Add</Link>
              <button className="glass-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  wrapper: {
    padding: "18px 24px 0",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    borderRadius: "20px",
  },
  logo: {
    margin: 0,
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "700",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "rgba(255,255,255,0.92)",
    fontSize: "1rem",
  },
};

export default Navbar;