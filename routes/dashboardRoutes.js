const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Welcome to the dashboard
 *     description: Welcome message for the dashboard
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the dashboard!
 */

router.get("/", (req, res) => {
  res.send("Welcome to the dashboard!");
});

module.exports = router;
