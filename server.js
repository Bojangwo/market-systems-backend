require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const path = require("path");

const adminRoutes =
  require("./routes/adminRoutes");

const reviewRoutes =
  require("./routes/reviewRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(
  cors({
    origin:
    "https://market-systems-frontend.vercel.app",
    credentials: true,
  })
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/reviews",reviewRoutes);

app.get("/", (req, res) => {
  res.send("Supermarket API Running");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});