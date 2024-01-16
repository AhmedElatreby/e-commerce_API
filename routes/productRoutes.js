const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         category_id:
 *           type: integer
 *           description: category id
 *           example: 5
 *         name:
 *           type: string
 *           description: Product name
 *           example: Laptop
 *         price:
 *           type: number
 *           format: float
 *           description: Product price
 *           example: 999.99
 *         description:
 *           type: string
 *           description: Product description
 *           example: High-performance laptop with SSD.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products or products by category
 *     description: Retrieve a list of all products or products by category
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Successfully created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

router.get("/", ProductController.getAllProducts);

router.post("/", ProductController.createProduct);

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a single product by ID
 *     description: Retrieve a single product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by ID
 *     description: Update a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Successfully updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     description: Delete a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successfully deleted product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

router.get("/:productId", ProductController.getProductById);

router.put("/:productId", ProductController.updateProductById);

router.delete("/:productId", ProductController.deleteProductById);

module.exports = router;
