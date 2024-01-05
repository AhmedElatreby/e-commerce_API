const OrderModel = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
    try {
      const userId = req.user.id; 
      const orders = await OrderModel.getAllOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

// Add other CRUD operations as needed
