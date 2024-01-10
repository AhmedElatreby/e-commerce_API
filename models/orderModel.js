const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const createOrderInDB = async (order) => {
  try {
    // Insert the order into the orders table
    await db.none(
      "INSERT INTO Orders (order_id, user_id, status, total_price) VALUES ($1::uuid, $2, $3, $4)",
      [order.order_id, order.user_id, order.status, order.total_price]
    );

    // No rows are expected to be returned since we used db.none
    return order;
  } catch (error) {
    // Handle errors, log them, or throw an exception
    console.error("Error creating order in the database:", error);
    throw error;
  }
};

// Function to create a new order
const createOrder = async (cartDetails) => {
  try {
    // Generate a unique order ID using uuid
    const order_id = uuidv4();
    // Calculate the total price based on the cartDetails or any other logic
    const total_price = calculateTotalPrice(cartDetails.products);

    // Create an order object
    const order = {
      order_id,
      user_id: cartDetails.user_id,
      status: "pending", // You can set the initial status as "pending" or any other suitable status
      total_price,
    };

    // Save the order to the database
    await createOrderInDB(order);

    // You can perform additional actions here if needed

    // Return the created order
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Function to update an existing order
const updateOrder = async (orderId, userId, updatedOrderData) => {
  try {
    const query = `
      UPDATE Orders
      SET status = $1, total_price = $2
      WHERE order_id = $3 AND user_id = $4
    `;
    await db.none(query, [
      updatedOrderData.status,
      updatedOrderData.total_price,
      orderId,
      userId,
    ]);

    // Check if the order was updated successfully
    const updatedOrder = await getOrderById(orderId, userId);
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Function to delete an existing order
const deleteOrder = async (orderId, userId) => {
  try {
    const query = `
      DELETE FROM Orders
      WHERE order_id = $1 AND user_id = $2
    `;
    await db.none(query, [orderId, userId]);

    // Check if the order was deleted successfully
    const deletedOrder = await getOrderById(orderId, userId);
    return deletedOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// Calculate the total price based on the products in the cart
const calculateTotalPrice = (products) => {
  if (!products || products.length === 0) {
    return 0;
  }

  // Assuming each product has a 'price' property
  return products.reduce((total, product) => total + product.price, 0);
};

// Function to get all orders for a user
const getAllOrders = async (userId) => {
  try {
    const query = "SELECT * FROM Orders WHERE user_id = $1";
    const result = await db.any(query, [userId]);
    return result;
  } catch (error) {
    console.error("Error retrieving orders from the database:", error);
    throw error;
  }
};

// Function to get order by ID for a user
const getOrderById = async (orderId, userId) => {
  try {
    const query = "SELECT * FROM Orders WHERE order_id = $1 AND user_id = $2";
    const result = await db.oneOrNone(query, [orderId, userId]);
    return result;
  } catch (error) {
    console.error("Error retrieving order from the database:", error);
    throw error;
  }
};

module.exports = {
  createOrder,
  createOrderInDB,
  calculateTotalPrice,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
