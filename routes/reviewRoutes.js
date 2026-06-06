const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  addReview
} = require(
  "../controllers/reviewController"
);

router.post(
  "/:productId",
  auth,
  addReview
);

module.exports = router;