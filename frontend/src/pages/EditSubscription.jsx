import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import SubscriptionForm from "../components/SubscriptionForm";

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await API.get(`/subscriptions/${id}`);
        setSubscription(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubscription();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await API.put(`/subscriptions/${id}`, formData);
      navigate("/subscriptions");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="page-container">
      <h1 className="section-title">Edit Subscription</h1>
      {subscription ? (
        <SubscriptionForm
          initialData={subscription}
          onSubmit={handleUpdate}
          buttonText="Update Subscription"
        />
      ) : (
        <p className="muted-text">Loading...</p>
      )}
    </div>
  );
};

export default EditSubscription;