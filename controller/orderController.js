const OrderModel = require("../models/orderModel");

// Assuming this is the getAllOrders function in orderController.js
exports.getAllOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.getAllOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    const order = await OrderModel.getOrderById(orderId, userId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const cartDetails = req.body;
    const order = await OrderModel.createOrder(cartDetails);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error during order creation" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    const updatedOrderData = req.body;
    const updatedOrder = await OrderModel.updateOrder(
      orderId,
      userId,
      updatedOrderData
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ error: "Order not found or not authorized for update" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error during order update" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    const deletedOrder = await OrderModel.deleteOrder(orderId, userId);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ error: "Order not found or not authorized for deletion" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error during order deletion" });
  }
};
  exports.getOrderById = async (req, res) => {
    try {
      const userId = req.user.id; 
      const orderId = req.params.orderId;
      const order = await OrderModel.getOrderById(orderId, userId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.createOrder = async (req, res) => {
    try {
      const cartDetails = req.body; // Assuming the cart details are sent in the request body
      const order = await OrderModel.createOrder(cartDetails);
      res.status(201).json(order); // 201 Created status for successful creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error during order creation' });
    }
  };

  exports.updateOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.orderId;
      const updatedOrderData = req.body; // Assuming the updated order data is sent in the request body
      const updatedOrder = await OrderModel.updateOrder(orderId, userId, updatedOrderData);
      
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found or not authorized for update' });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error during order update' });
    }
  };


  exports.deleteOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.orderId;
      const deletedOrder = await OrderModel.deleteOrder(orderId, userId);
  
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found or not authorized for deletion' });
      }
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error during order deletion' });
    }
  };

