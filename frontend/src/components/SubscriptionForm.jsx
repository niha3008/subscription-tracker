import { useState } from "react";

const SubscriptionForm = ({ onSubmit, buttonText }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    billingCycle: "Monthly",
    renewalDate: "",
    paymentMethod: "",
    status: "Active",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input name="name" placeholder="Subscription Name" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />

      <select name="billingCycle" onChange={handleChange}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <input name="renewalDate" type="date" onChange={handleChange} required />
      <input name="paymentMethod" placeholder="Payment Method" onChange={handleChange} />

      <select name="status" onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <textarea name="notes" placeholder="Notes" onChange={handleChange} />

      <button type="submit" className="btn">
        {buttonText}
      </button>
    </form>
  );
};

export default SubscriptionForm;