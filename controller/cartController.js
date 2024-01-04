const CartModel = require("../models/cartModel");

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    console.log("User in session:", req.user); // Check if the user is available in the session
    console.log("Is authenticated:", req.isAuthenticated()); // Check if the user is authenticated

    // Check if the user is authenticated using req.isAuthenticated()
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;
    await CartModel.createCart(userId);
    res.status(200).json({ message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add product to cart
exports.addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id;
    const quantity = req.body.quantity || 1;
    const addedProduct = await CartModel.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.status(201).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get cart details
exports.getCartDetails = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartDetails = await CartModel.getCartDetails(cartId);
    res.json(cartDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update product quantity in cart
exports.updateProductQuantityInCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id; // Check the property name in the request
    const quantity = req.body.quantity;

    // Call the method to update the product quantity in the cart
    const updatedProduct = await CartModel.updateProductQuantityInCart(
      cartId,
      productId,
      quantity
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.product_id;
    const removedProduct = await CartModel.removeProductFromCart(
      cartId,
      productId
    );
    res.json(removedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
