const db = require("../db/db");

// Retrieve all products or products by category
const getAllProducts = async () => {
  const query = "SELECT * FROM Products";
  const result = await db.any(query);
  return result;
};

const getProductsByCategory = async (category) => {
  const query = `
    SELECT Products.* 
    FROM Products 
    JOIN Product_Categories ON Products.product_id = Product_Categories.product_id
    JOIN Categories ON Product_Categories.category_id = Categories.category_id
    WHERE Categories.category_name = $1
  `;
  const result = await db.any(query, [category]);
  return result;
};

// Retrieve a single product by ID
const getProductById = async (productId) => {
  const query = `
    SELECT 
      Products.*,
      ARRAY_AGG(Categories.category_name) AS category_names
    FROM 
      Products
    LEFT JOIN 
      Product_Categories ON Products.product_id = Product_Categories.product_id
    LEFT JOIN 
      Categories ON Product_Categories.category_id = Categories.category_id
    WHERE 
      Products.product_id = $1
    GROUP BY 
      Products.product_id
  `;
  const result = await db.oneOrNone(query, [productId]);
  return result;
};

// Create a new product
const createProduct = async (newProduct) => {
  const { name, price, description } = newProduct;
  const query =
    "INSERT INTO Products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
  const result = await db.one(query, [name, price, description]);
  return result;
};

// Associate a product with a category
const associateProductWithCategory = async (productId, categoryId) => {
  const query =
    "INSERT INTO Product_Categories (product_id, category_id) VALUES ($1, $2)";
  await db.none(query, [productId, categoryId]);
};

// Update a product by ID
const updateProduct = async (productId, updatedProduct) => {
  const { name, price, description } = updatedProduct;
  const query =
    "UPDATE Products SET name = $1, price = $2, description = $3 WHERE product_id = $4 RETURNING *";
  const result = await db.oneOrNone(query, [
    name,
    price,
    description,
    productId,
  ]);
  return result;
};

// Delete a product by ID
const deleteProduct = async (productId) => {
  const query = "DELETE FROM Products WHERE product_id = $1 RETURNING *";
  const result = await db.oneOrNone(query, [productId]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  associateProductWithCategory,
};
