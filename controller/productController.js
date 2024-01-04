const ProductModel = require("../models/productModel");

// get all products or products by category
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const productsByCategory = await ProductModel.getProductsByCategory(
        category
      );
      res.json(productsByCategory);
    } else {
      const allProducts = await ProductModel.getAllProducts();
      res.json(allProducts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await ProductModel.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const createdProduct = await ProductModel.createProduct(newProduct);

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = req.body;

    const product = await ProductModel.updateProduct(productId, updatedProduct);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await ProductModel.deleteProduct(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
