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
    <div className="page-container">
      <h1 className="section-title">Dashboard</h1>

      {summary ? (
        <>
          <div style={styles.grid}>
            <div className="glass-card" style={styles.statCard}>
              <p style={styles.label}>Total Subscriptions</p>
              <h2 style={styles.value}>{summary.totalSubscriptions}</h2>
            </div>

            <div className="glass-card" style={styles.statCard}>
              <p style={styles.label}>Active Subscriptions</p>
              <h2 style={styles.value}>{summary.activeSubscriptions}</h2>
            </div>

            <div className="glass-card" style={styles.statCard}>
              <p style={styles.label}>Total Monthly Spend</p>
              <h2 style={styles.value}>₹{summary.totalMonthly}</h2>
            </div>

            <div className="glass-card" style={styles.statCard}>
              <p style={styles.label}>Total Yearly Spend</p>
              <h2 style={styles.value}>₹{summary.totalYearly}</h2>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h2 style={styles.subheading}>Upcoming Renewals</h2>

            {summary.upcomingRenewals && summary.upcomingRenewals.length > 0 ? (
              <div style={styles.renewalsList}>
                {summary.upcomingRenewals.map((sub) => (
                  <div key={sub._id} className="glass-card" style={styles.renewalCard}>
                    <div>
                      <h3 style={styles.renewalName}>{sub.name}</h3>
                      <p style={styles.renewalMeta}>{sub.category}</p>
                    </div>

                    <div style={styles.renewalRight}>
                      <p style={styles.renewalDate}>
                        {new Date(sub.renewalDate).toLocaleDateString()}
                      </p>
                      <p style={styles.renewalMeta}>
                        ₹{sub.price} / {sub.billingCycle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted-text">No upcoming renewals.</p>
            )}
          </div>
        </>
      ) : (
        <p className="muted-text">Loading...</p>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "22px",
  },
  statCard: {
    padding: "24px",
    minHeight: "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    margin: "0 0 12px",
    color: "rgba(255,255,255,0.78)",
    fontSize: "1rem",
  },
  value: {
    margin: 0,
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "700",
  },
  subheading: {
    color: "#ffffff",
    marginBottom: "18px",
    fontSize: "1.6rem",
  },
  renewalsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  renewalCard: {
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  renewalName: {
    margin: "0 0 6px",
    color: "#ffffff",
    fontSize: "1.25rem",
  },
  renewalMeta: {
    margin: 0,
    color: "rgba(245, 242, 255, 0.74)",
    fontSize: "0.95rem",
  },
  renewalRight: {
    textAlign: "right",
  },
  renewalDate: {
    margin: "0 0 6px",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "600",
  },
};

export default Dashboard;