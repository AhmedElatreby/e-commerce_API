const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");
const { ensureAuthenticated } = require("../config/passportConfig");

// Ensure the user is authenticated before creating a new cart
router.post("/create", ensureAuthenticated, (req, res) => {
  console.log("Is authenticated:", req.isAuthenticated());
  console.log("User in session when creating cart:", req.user.email);
  console.log("User in session:", req.user);

  // Pass the request and response objects to the controller function
  CartController.createCart(req, res);
});

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
