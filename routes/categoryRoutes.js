const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");

router.get("/", CategoryController.getCategoryById);
router.get("/:categoryId", CategoryController.getCategoryById);

module.exports = router;
