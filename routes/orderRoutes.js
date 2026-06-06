const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const role =
  require("../middleware/roleMiddleware");

const {
  checkout,
  getMyOrders,
  getAllOrders,
  updateStatus
} = require("../controllers/orderController");

// Customer
router.post(
  "/checkout",
  auth,
  checkout
);

router.get(
  "/my-orders",
  auth,
  getMyOrders
);

// Assistant & Owner
router.get(
  "/",
  auth,
  role("assistant", "owner"),
  getAllOrders
);

router.put(
  "/:id/status",
  auth,
  role("assistant", "owner"),
  updateStatus
);

module.exports = router;