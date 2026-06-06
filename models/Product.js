const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: String,

    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

    category: String,

    image: String,

    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0
    },

    reviewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);