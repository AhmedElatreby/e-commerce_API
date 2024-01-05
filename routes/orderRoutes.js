const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

// GET all orders
router.get("/", OrderController.getAllOrders);

// GET a specific order by ID
router.get("/:orderId", OrderController.getOrderById);

// POST create a new order
router.post("/", OrderController.createOrder);

// PUT update an existing order by ID
router.put("/:orderId", OrderController.updateOrder);

// DELETE delete an existing order by ID
router.delete("/:orderId", OrderController.deleteOrder);

module.exports = router;
