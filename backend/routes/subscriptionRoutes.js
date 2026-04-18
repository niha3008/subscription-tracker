const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getSummary,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/summary", protect, getSummary);
router.post("/", protect, addSubscription);
router.get("/", protect, getSubscriptions);
router.get("/:id", protect, getSubscriptionById);
router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

module.exports = router;