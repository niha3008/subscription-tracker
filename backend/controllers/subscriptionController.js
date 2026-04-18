const Subscription = require("../models/Subscription");

const addSubscription = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      billingCycle,
      startDate,
      renewalDate,
      paymentMethod,
      status,
      notes,
    } = req.body;

    if (!name || !category || !price || !billingCycle || !renewalDate) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const subscription = await Subscription.create({
      user: req.user._id,
      name,
      category,
      price,
      billingCycle,
      startDate,
      renewalDate,
      paymentMethod,
      status,
      notes,
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await subscription.deleteOne();

    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getSummary = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });

    let totalMonthly = 0;
    let totalYearly = 0;
    let activeCount = 0;

    subscriptions.forEach((sub) => {
      if (sub.status === "Active") activeCount++;

      if (sub.billingCycle === "Monthly") {
        totalMonthly += sub.price;
        totalYearly += sub.price * 12;
      } else if (sub.billingCycle === "Yearly") {
        totalYearly += sub.price;
        totalMonthly += sub.price / 12;
      }
    });

    res.json({
      totalSubscriptions: subscriptions.length,
      activeSubscriptions: activeCount,
      totalMonthly: Number(totalMonthly.toFixed(2)),
      totalYearly: Number(totalYearly.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getSummary,
};