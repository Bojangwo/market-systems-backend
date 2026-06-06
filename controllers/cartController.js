const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user.id
    }).populate("items.product");

    if (!cart) {
      return res.json({
        items: []
      });
    }

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.removeFromCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item =>
        item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.updateQuantity = async (req, res) => {
  try {

    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      item =>
        item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};