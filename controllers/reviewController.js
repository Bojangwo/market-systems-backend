const Product = require("../models/Product");

exports.addReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const alreadyReviewed =
  product.reviews.find(
    review =>
      review.user.toString() ===
      req.user.id
  );

if (alreadyReviewed) {
  return res.status(400).json({
    message:
      "You have already reviewed this product"
  });
}

    product.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    const total =
      product.reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    product.averageRating =
      total / product.reviews.length;

    product.reviewCount =
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message:
        "Review added successfully",
      averageRating:
        product.averageRating
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};