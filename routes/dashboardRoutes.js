const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const role =
  require("../middleware/roleMiddleware");

const {
  getDashboardStats,
  getLowStockProducts
} = require("../controllers/dashboardController");

router.get(
  "/",
  auth,
  role("owner"),
  getDashboardStats
);

router.get(
  "/low-stock",
  auth,
  role("owner"),
  getLowStockProducts
);

module.exports = router;