import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchSubscriptions = async () => {
    try {
      const { data } = await API.get("/subscriptions");
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/subscriptions/${id}`);
      fetchSubscriptions();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(subscriptions.map((sub) => sub.category))];
    return ["All", ...uniqueCategories];
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || sub.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || sub.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [subscriptions, searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="page-container">
      <h1 className="section-title">All Subscriptions</h1>

      <div className="glass-card" style={styles.filterBar}>
        <input
          className="glass-input"
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.filterInput}
        />

        <select
          className="glass-input"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.filterSelect}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>

        <select
          className="glass-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredSubscriptions.length === 0 ? (
        <p className="muted-text">No subscriptions match your search/filter.</p>
      ) : (
        <div style={styles.list}>
          {filteredSubscriptions.map((sub) => (
            <div key={sub._id} className="glass-card" style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <h2 style={styles.name}>{sub.name}</h2>
                  <p style={styles.category}>{sub.category}</p>
                </div>

                <div style={styles.priceBlock}>
                  <p style={styles.priceLabel}>Price</p>
                  <h3 style={styles.price}>₹{sub.price}</h3>
                </div>
              </div>

              <div style={styles.detailsGrid}>
                <div>
                  <p style={styles.detailLabel}>Billing Cycle</p>
                  <p style={styles.detailValue}>{sub.billingCycle}</p>
                </div>

                <div>
                  <p style={styles.detailLabel}>Status</p>
                  <p style={styles.detailValue}>{sub.status}</p>
                </div>

                <div>
                  <p style={styles.detailLabel}>Renewal Date</p>
                  <p style={styles.detailValue}>
                    {new Date(sub.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div style={styles.actions}>
                <Link to={`/subscriptions/edit/${sub._id}`}>
                  <button className="glass-button">Edit</button>
                </Link>

                <button
                  className="glass-button secondary-button"
                  onClick={() => handleDelete(sub._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  filterBar: {
    padding: "18px",
    marginBottom: "24px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "14px",
  },
  filterInput: {
    marginBottom: 0,
  },
  filterSelect: {
    marginBottom: 0,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    padding: "24px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  name: {
    margin: "0 0 6px",
    color: "#ffffff",
    fontSize: "1.8rem",
  },
  category: {
    margin: 0,
    color: "rgba(245, 242, 255, 0.78)",
    fontSize: "1rem",
  },
  priceBlock: {
    textAlign: "right",
  },
  priceLabel: {
    margin: "0 0 6px",
    color: "rgba(245, 242, 255, 0.7)",
    fontSize: "0.9rem",
  },
  price: {
    margin: 0,
    color: "#ffffff",
    fontSize: "1.8rem",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
    marginBottom: "22px",
  },
  detailLabel: {
    margin: "0 0 6px",
    color: "rgba(245, 242, 255, 0.7)",
    fontSize: "0.9rem",
  },
  detailValue: {
    margin: 0,
    color: "#ffffff",
    fontSize: "1rem",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
};

export default Subscriptions;