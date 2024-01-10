const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");

// Retrieve all categories
router.get("/", CategoryController.getAllCategories);

// Retrieve a single category by ID
router.get("/:categoryId", CategoryController.getCategoryById);

// Create a new category
router.post("/", CategoryController.createCategory);

// Update a category by ID
router.put("/:categoryId", CategoryController.updateCategoryById);

// Delete a category by ID
router.delete("/:categoryId", CategoryController.deleteCategoryById);

module.exports = router;
