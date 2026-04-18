import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    const { data } = await API.get("/subscriptions");
    setSubscriptions(data);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/subscriptions/${id}`);
    fetchSubscriptions();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Subscriptions</h2>

      {subscriptions.map((sub) => (
        <div key={sub._id} className="card">
          <h3>{sub.name}</h3>
          <p>Category: {sub.category}</p>
          <p>Price: ₹{sub.price}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/subscriptions/edit/${sub._id}`}>
              <button className="btn">Edit</button>
            </Link>

            <button className="btn" onClick={() => handleDelete(sub._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;