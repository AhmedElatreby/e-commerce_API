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

module.exports = {
  getAllCategories,
  getCategoryById,
  // Add additional functions for creating, updating, and deleting categories if needed
};
