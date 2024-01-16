const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         cart_id:
 *           type: integer
 *           description: Cart ID
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: User ID
 *           example: 123
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Cart creation timestamp
 *           example: 2024-01-17T18:01:52.928Z
 *         total_price:
 *           type: number
 *           format: float
 *           description: Total price of the cart
 *           example: 99.99
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: Product ID
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Laptop
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Product price
 *                 example: 999.99
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product in the cart
 *                 example: 2
 */

/**
 * @swagger
 * /carts/create:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Create a new cart
 *     description: Create a new cart for the authenticated user
 *     responses:
 *       201:
 *         description: Successfully created a new cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.post('/create', CartController.createCart);

/**
 * @swagger
 * /carts/{cartId}/addProduct:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Add a product to the user's cart
 *     description: Add a product to the user's cart by providing the cart ID
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to add the product to
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
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to add to the cart
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully added product to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.post("/:cartId/addProduct", CartController.addProductToCart);

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Get details of the user's cart
 *     description: Get details of the user's cart by providing the cart ID
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to retrieve details
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Details of the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.get("/:cartId", CartController.getCartDetails);

/**
 * @swagger
 * /carts/{cartId}/updateProduct:
 *   put:
 *     tags:
 *       - Carts
 *     summary: Update the quantity of a product in the user's cart
 *     description: Update the quantity of a product in the user's cart by providing the cart ID
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to update the product quantity
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
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to update in the cart
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the product in the cart
 *                 example: 3
 *     responses:
 *       200:
 *         description: Successfully updated product quantity in the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.put("/:cartId/updateProduct", CartController.updateProductQuantityInCart);

/**
 * @swagger
 * /carts/{cartId}/removeProduct:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Remove a product from the user's cart
 *     description: Remove a product from the user's cart by providing the cart ID
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to remove the product from
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
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to remove from the cart
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully removed product from the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.delete("/:cartId/removeProduct", CartController.removeProductFromCart);

/**
 * @swagger
 * /carts/{cartId}/checkout:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Checkout the user's cart
 *     description: Checkout the user's cart by providing the cart ID
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to checkout
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successfully checked out the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

router.post("/:cartId/checkout", CartController.checkout);

module.exports = router;
