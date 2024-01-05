const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

// GET all orders
router.get("/", OrderController.getAllOrders);

// GET a specific order by ID
router.get("/:orderId", OrderController.getOrderById);

module.exports = router;
