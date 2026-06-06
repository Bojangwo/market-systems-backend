const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
  try {

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,

      image: req.file
        ? req.file.filename
        : null
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const {
      search,
      category,
      minPrice,
      maxPrice
    } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i"
      };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {

      filter.price = {};

      if (minPrice) {
        filter.price.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte =
          Number(maxPrice);
      }
    }

    const totalProducts =
      await Product.countDocuments(filter);

    const products =
      await Product.find(filter)
        .skip(skip)
        .limit(limit);

    res.json({
      currentPage: page,
      totalPages:
        Math.ceil(
          totalProducts / limit
        ),
      totalProducts,
      products
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get Single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};