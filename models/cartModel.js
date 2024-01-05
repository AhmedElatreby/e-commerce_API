const pool = require("../db/db");

const createCart = async (userId) => {
  const query = "INSERT INTO Carts (user_id) VALUES ($1) RETURNING *";
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

const addProductToCart = async (cartId, productId, quantity) => {
  const query =
    "INSERT INTO Cart_Items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [cartId, productId, quantity]);
  return result.rows[0];
};

const getCartDetails = async (cartId) => {
  const query = `
    SELECT 
      Cart_Items.quantity,
      Products.*
    FROM 
      Cart_Items
    JOIN 
      Products ON Cart_Items.product_id = Products.product_id
    WHERE 
      Cart_Items.cart_id = $1
  `;
  const result = await pool.query(query, [cartId]);
  return result.rows;
};

const updateProductQuantityInCart = async (cartId, productId, quantity) => {
  const query =
    "UPDATE Cart_Items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";
  const result = await pool.query(query, [quantity, cartId, productId]);
  return result.rows[0];
};

const removeProductFromCart = async (cartId, productId) => {
  const query =
    "DELETE FROM Cart_Items WHERE cart_id = $1 AND product_id = $2 RETURNING *";
  const result = await pool.query(query, [cartId, productId]);
  return result.rows[0];
};

const clearCart = async (cartId) => {
  try {
    const deleteQuery = "DELETE FROM Cart_Items WHERE cart_id = $1";
    await pool.query(deleteQuery, [cartId]);

    // Alternatively, if you want to mark the cart as checked out, update the Carts table
    // const updateQuery = "UPDATE Carts SET checked_out = true WHERE cart_id = $1";
    // await pool.query(updateQuery, [cartId]);

    // Return any relevant information after clearing the cart
    const result = {
      message: "Cart cleared successfully",
    };

    return result;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartDetails,
  updateProductQuantityInCart,
  removeProductFromCart,
  clearCart,
};
