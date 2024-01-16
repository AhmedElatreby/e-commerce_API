const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         category_name:
 *           type: string
 *           description: Category name
 *           example: Electronics
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Retrieve all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully fetched all categories!
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */

router.get("/", CategoryController.getAllCategories);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Retrieve a single category by ID
 *     description: Retrieve a category by its ID
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully fetched category by ID!
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */

router.get("/:categoryId", CategoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Successfully created category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully created category!
 */

router.post("/", CategoryController.createCategory);

/**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category by ID
 *     description: Update a category by its ID
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Successfully updated category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully updated category!
 */

router.put("/:categoryId", CategoryController.updateCategoryById);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category by ID
 *     description: Delete a category by its ID
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Successfully deleted category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: Successfully deleted category!
 */

router.delete("/:categoryId", CategoryController.deleteCategoryById);

module.exports = router;
