const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.checkout = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user.id
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of cart.items) {

      const product = await Product.findById(
        item.product._id
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message:
            `${product.name} has insufficient stock`
        });
      }

      product.stock -= item.quantity;

      await product.save();

      totalAmount +=
        product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = await Order.create({
      customer: req.user.id,
      items: orderItems,
      totalAmount
    });

    cart.items = [];

    await cart.save();

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      customer: req.user.id
    })
      .populate("items.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("customer")
      .populate("items.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.updateStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};