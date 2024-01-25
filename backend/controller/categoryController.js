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

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = req.body;

    const createdCategory = await CategoryModel.createCategory(newCategory);

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = req.body;

    const category = await CategoryModel.updateCategory(
      categoryId,
      updatedCategory
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await CategoryModel.deleteCategory(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
