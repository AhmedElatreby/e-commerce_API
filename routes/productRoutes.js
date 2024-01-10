const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");

// Retrieve all products or products by category
router.get("/", ProductController.getAllProducts);

// Retrieve a single product by ID
router.get("/:productId", ProductController.getProductById);

// Create a new product
router.post("/", ProductController.createProduct);

// Update a product by ID
router.put("/:productId", ProductController.updateProductById);

// Delete a product by ID
router.delete("/:productId", ProductController.deleteProductById);

module.exports = router;
