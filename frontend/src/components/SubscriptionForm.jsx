import { useEffect, useState } from "react";

const SubscriptionForm = ({ onSubmit, initialData = {}, buttonText }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    billingCycle: "Monthly",
    startDate: "",
    renewalDate: "",
    paymentMethod: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || "",
        billingCycle: initialData.billingCycle || "Monthly",
        startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : "",
        renewalDate: initialData.renewalDate ? initialData.renewalDate.slice(0, 10) : "",
        paymentMethod: initialData.paymentMethod || "",
        status: initialData.status || "Active",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card glass-form" style={{ maxWidth: "760px" }}>
      <input
        className="glass-input"
        name="name"
        placeholder="Subscription Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className="glass-input"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        className="glass-input"
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <select
        className="glass-input"
        name="billingCycle"
        value={form.billingCycle}
        onChange={handleChange}
      >
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <input
        className="glass-input"
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
      />

      <input
        className="glass-input"
        name="renewalDate"
        type="date"
        value={form.renewalDate}
        onChange={handleChange}
        required
      />

      <input
        className="glass-input"
        name="paymentMethod"
        placeholder="Payment Method"
        value={form.paymentMethod}
        onChange={handleChange}
      />

      <select
        className="glass-input"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Active">Active</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <textarea
        className="glass-input"
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        rows="4"
      />

      <button type="submit" className="glass-button" style={{ width: "100%" }}>
        {buttonText}
      </button>
    </form>
  );
};

export default SubscriptionForm;