const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { ensureAuthenticated } = require('../config/passportConfig')



/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Render login page
 *     description: Render the login page for users
 *     responses:
 *       200:
 *         description: Successfully rendered login page
 */
router.get("/login", authController.getLogin);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user
 *     description: Authenticate user and log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: test123
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password3456
 *     responses:
 *       200:
 *         description: Successfully authenticated user
 */
router.post("/login", authController.postLogin);


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Log out user
 *     description: Log out the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out user
 */
router.get('/logout', ensureAuthenticated,  authController.logout);


module.exports = router;
