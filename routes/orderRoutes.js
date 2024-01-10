const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");
const ensureAuthenticated =
  require("../config/passportConfig").ensureAuthenticated;

// GET all orders
router.get("/", ensureAuthenticated, async (req, res, next) => {
  try {
    console.log("Calling getAllOrders");
    await OrderController.getAllOrders(req, res, next);
    // Additional logic if needed
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
});

// GET a specific order by ID
router.get("/:orderId", ensureAuthenticated, OrderController.getOrderById);

// POST create a new order
router.post("/", ensureAuthenticated, OrderController.createOrder);

// PUT update an existing order by ID
router.put("/:orderId", ensureAuthenticated, OrderController.updateOrder);

// DELETE delete an existing order by ID
router.delete("/:orderId", ensureAuthenticated, OrderController.deleteOrder);

// POST create a new order
router.post("/", OrderController.createOrder);

// PUT update an existing order by ID
router.put("/:orderId", OrderController.updateOrder);

// DELETE delete an existing order by ID
router.delete("/:orderId", OrderController.deleteOrder);

module.exports = router;
