const pool = require("../db/db");

// Retrieve all categories
const getAllCategories = async () => {
  const query = "SELECT * FROM Categories";
  const result = await pool.query(query);
  return result.rows;
};

// Retrieve a single category by ID
const getCategoryById = async (categoryId) => {
  const query = "SELECT * FROM Categories WHERE category_id = $1";
  const result = await pool.query(query, [categoryId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Create a new category
const createCategory = async (newCategory) => {
  const { category_name } = newCategory;
  const query =
    "INSERT INTO Categories (category_name) VALUES ($1) RETURNING *";
  const result = await pool.query(query, [category_name]);
  return result.rows[0];
};

// Update a category by ID
const updateCategory = async (categoryId, updatedCategory) => {
  const { category_name } = updatedCategory;
  const query =
    "UPDATE Categories SET category_name = $1 WHERE category_id = $2 RETURNING *";
  const result = await pool.query(query, [category_name, categoryId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Delete a category by ID
const deleteCategory = async (categoryId) => {
  const query = "DELETE FROM Categories WHERE category_id = $1 RETURNING *";
  const result = await pool.query(query, [categoryId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
