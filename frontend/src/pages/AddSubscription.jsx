import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SubscriptionForm from "../components/SubscriptionForm";

const AddSubscription = () => {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await API.post("/subscriptions", formData);
      navigate("/subscriptions");
    } catch (error) {
      console.error(error);
      alert("Failed to add subscription");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Subscription</h2>
      <SubscriptionForm onSubmit={handleAdd} buttonText="Add Subscription" />
    </div>
  );
};

export default AddSubscription;