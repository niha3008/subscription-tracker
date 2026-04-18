import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await API.get("/subscriptions/summary");
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {summary ? (
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Total Subscriptions</h3>
            <p>{summary.totalSubscriptions}</p>
          </div>

          <div style={styles.card}>
            <h3>Active Subscriptions</h3>
            <p>{summary.activeSubscriptions}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Monthly Spend</h3>
            <p>₹{summary.totalMonthly}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Yearly Spend</h3>
            <p>₹{summary.totalYearly}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default Dashboard;