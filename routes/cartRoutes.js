const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");
const ensureAuthenticated =
  require("../config/passportConfig").ensureAuthenticated;

// Create a new cart for the authenticated user
router.post("/create", ensureAuthenticated, CartController.createCart);

// Add a product to the user's cart
router.post(
  "/:cartId/addProduct",
  ensureAuthenticated,
  CartController.addProductToCart
);

// Get details of the user's cart
router.get("/:cartId", ensureAuthenticated, CartController.getCartDetails);

// Update the quantity of a product in the user's cart
router.put(
  "/:cartId/updateProduct",
  ensureAuthenticated,
  CartController.updateProductQuantityInCart
);

// Remove a product from the user's cart
router.delete(
  "/:cartId/removeProduct",
  ensureAuthenticated,
  CartController.removeProductFromCart
);

// Checkout route
router.post("/:cartId/checkout", ensureAuthenticated, CartController.checkout);

module.exports = router;
