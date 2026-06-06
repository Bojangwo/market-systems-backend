const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const role =
  require("../middleware/roleMiddleware");

const {
  createAssistant
} = require("../controllers/adminController");

router.post(
  "/create-assistant",
  auth,
  role("owner"),
  createAssistant
);

module.exports = router;