const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createAssistant = async (req, res) => {
  try {

    const {
      fullname,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const assistant =
      await User.create({
        fullname,
        email,
        password: hashedPassword,
        role: "assistant"
      });

    res.status(201).json({
      message:
        "Assistant created successfully",
      assistant
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};