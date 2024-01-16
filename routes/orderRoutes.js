const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         order_id:
 *           type: integer
 *           description: Order ID
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: User ID associated with the order
 *           example: 123
 *         status:
 *           type: string
 *           description: Order status
 *           example: Shipped
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Order creation timestamp
 *           example: 2024-01-17T18:01:52.928Z
 *         total_price:
 *           type: number
 *           format: float
 *           description: Total price of the order
 *           example: 99.99
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               order_item_id:
 *                 type: integer
 *                 description: Order item ID
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 description: Product ID
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product in the order
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the product in the order
 *                 example: 49.99
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Retrieve a list of all orders for the authenticated user
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

router.get("/", OrderController.getAllOrders);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get details of a specific order
 *     description: Retrieve details of a specific order by providing the order ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to retrieve details
 *         schema:
 *           type: uuid
 *           format: int64
 *     responses:
 *       200:
 *         description: Details of the order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

router.get("/:orderId", OrderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Create a new order for the authenticated user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user placing the order
 *                 example: 123
 *               status:
 *                 type: string
 *                 description: Order status
 *                 example: Pending
 *               total_price:
 *                 type: number
 *                 format: float
 *                 description: Total price of the order
 *                 example: 99.99
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: ID of the product in the order
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product in the order
 *                       example: 2
 *     responses:
 *       201:
 *         description: Successfully created a new order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

router.post("/", OrderController.createOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update an existing order
 *     description: Update an existing order by providing the order ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the order
 *                 example: Shipped
 *               total_price:
 *                 type: number
 *                 format: float
 *                 description: New total price of the order
 *                 example: 129.99
 *     responses:
 *       200:
 *         description: Successfully updated the order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

router.put("/:orderId", OrderController.updateOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an existing order
 *     description: Delete an existing order by providing the order ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successfully deleted the order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

router.delete("/:orderId", OrderController.deleteOrder);

module.exports = router;
