const CategoryModel = require("../models/categoryModel");

// Retrieve all categories
exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategoryModel.getAllCategories();
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await CategoryModel.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Additional functions for creating, updating, and deleting categories can be added if needed
