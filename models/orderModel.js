const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const createOrderInDB = async (order) => {
  try {
    // Insert the order into the orders table
    const result = await db.one(
      "INSERT INTO Orders (order_id, user_id, status, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [order.order_id, order.user_id, order.status, order.total_price]
    );

    // Return the created order
    return result;
  } catch (error) {
    // Handle errors, log them, or throw an exception
    console.error("Error creating order in the database:", error);
    throw error;
  }
};

//  Assuming you have a method like this to create an order
const createOrder = async (cartDetails) => {
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
  const createdOrder = await createOrderInDB(order);

  // You can perform additional actions here if needed

  // Return the created order
  return createdOrder;
};

// Calculate the total price based on the products in the cart
const calculateTotalPrice = (products) => {
  if (!products || products.length === 0) {
    return 0;
  }

  // Assuming each product has a 'price' property
  return products.reduce((total, product) => total + product.price, 0);
};

module.exports = {
  createOrder,
  createOrderInDB,
  calculateTotalPrice,
};
