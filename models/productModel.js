const pool = require("../db/db");

// Retrieve all products or products by category
const getAllProducts = async () => {
  const query = "SELECT * FROM Products";
  const result = await pool.query(query);
  return result.rows;
};

const getProductsByCategory = async (category) => {
  const query = `
    SELECT Products.* 
    FROM Products 
    JOIN Product_Categories ON Products.product_id = Product_Categories.product_id
    JOIN Categories ON Product_Categories.category_id = Categories.category_id
    WHERE Categories.category_name = $1
  `;
  const result = await pool.query(query, [category]);
  return result.rows;
};

// Retrieve a single product by ID
const getProductById = async (productId) => {
  const query = "SELECT * FROM Products WHERE product_id = $1";
  const result = await pool.query(query, [productId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Create a new product
const createProduct = async (newProduct) => {
  const { name, price, description } = newProduct;
  const query =
    "INSERT INTO Products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [name, price, description]);
  return result.rows[0];
};

// Update a product by ID
const updateProduct = async (productId, updatedProduct) => {
  const { name, price, description } = updatedProduct;
  const query =
    "UPDATE Products SET name = $1, price = $2, description = $3 WHERE product_id = $4 RETURNING *";
  const result = await pool.query(query, [name, price, description, productId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Delete a product by ID
const deleteProduct = async (productId) => {
  const query = "DELETE FROM Products WHERE product_id = $1 RETURNING *";
  const result = await pool.query(query, [productId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
