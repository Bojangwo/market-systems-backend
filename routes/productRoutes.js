const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const role =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Public
router.get("/", getProducts);

router.get("/:id", getProduct);

// Owner Only
router.post(
  "/",
  auth,
  role("owner"),
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  auth,
  role("owner"),
  updateProduct
);

router.delete(
  "/:id",
  auth,
  role("owner"),
  deleteProduct
);

module.exports = router;