const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");
const { ensureAuthenticated } = require("../config/passportConfig");
const passport = require("passport");

// Ensure the user is authenticated before creating a new cart
router.post('/create', passport.authenticate('jwt', { session: false }), CartController.createCart);

// Add a product to the user's cart
router.post("/:cartId/addProduct", ensureAuthenticated, CartController.addProductToCart);

// Get details of the user's cart
router.get("/:cartId", ensureAuthenticated, CartController.getCartDetails);

// Update the quantity of a product in the user's cart
router.put("/:cartId/updateProduct", ensureAuthenticated, CartController.updateProductQuantityInCart);

// Remove a product from the user's cart
router.delete("/:cartId/removeProduct", ensureAuthenticated, CartController.removeProductFromCart);

// Checkout route
router.post("/:cartId/checkout", ensureAuthenticated, CartController.checkout);





module.exports = router;
