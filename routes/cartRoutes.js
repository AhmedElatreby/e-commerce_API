const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

// Create a new cart for the authenticated user
router.post("/create", CartController.createCart);

// Add a product to the user's cart
router.post("/:cartId/addProduct", CartController.addProductToCart);

// Get details of the user's cart
router.get("/:cartId", CartController.getCartDetails);

// Update the quantity of a product in the user's cart
router.put(
  "/:cartId/updateProduct",
  CartController.updateProductQuantityInCart
);

// Remove a product from the user's cart
router.delete("/:cartId/removeProduct", CartController.removeProductFromCart);

module.exports = router;
