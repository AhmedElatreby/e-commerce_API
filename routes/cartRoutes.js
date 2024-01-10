const express = require("express");
const passport = require("passport");
const router = express.Router();
const CartController = require("../controller/cartController");
const { ensureAuthenticated } = require("../config/passportConfig");

// Ensure the user is authenticated before creating a new cart
router.post(
  "/create",
  passport.authenticate("local", { session: false }),
  ensureAuthenticated,
  async (req, res) => {
    try {
      // The authenticated user information is available in req.user
      const email = req.user.email;

      // Pass the email to createCart function in CartController
      const cart = await CartController.createCart(email);

      res.status(201).json(cart);
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

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
