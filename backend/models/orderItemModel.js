const db = require('../db/db');

const createOrderItem = async (orderItem) => {
  try {
     await db.none(
      'INSERT INTO Order_Items (order_id, product_id, quantity, price_per_unit) VALUES ($1, $2, $3, $4)',
      [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.price_per_unit]
    );

    return orderItem;
  } catch (error) {
    console.error('Error creating order item in the database:', error);
    throw error;
  }
};

const getOrderItemsByOrderId = async (orderId) => {
  try {
    const query = 'SELECT * FROM Order_Items WHERE order_id = $1';
    const result = await db.any(query, [orderId]);
    return result;
  } catch (error) {
    console.error('Error retrieving order items from the database:', error);
    throw error;
  }
};

// Add other CRUD operations as needed

module.exports = {
  createOrderItem,
  getOrderItemsByOrderId,
  // Add other CRUD methods here
};
