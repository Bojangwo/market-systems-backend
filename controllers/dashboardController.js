const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalProducts =
      await Product.countDocuments();

    const totalCustomers =
      await User.countDocuments({
        role: "customer"
      });

    const totalOrders =
      await Order.countDocuments();

    const revenueResult =
      await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount"
            }
          }
        }
      ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.json({
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getLowStockProducts = async (req, res) => {
  try {

    const products =
      await Product.find({
        stock: { $lt: 5 }
      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};