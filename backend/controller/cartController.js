const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    // Check if the user is authenticated using req.isAuthenticated()
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Log user data from the session
    console.log("User in session when creating cart:", req.user);

    // User is authenticated, proceed to create the cart
   const user = req.user;
   const userId = user ? user.user_id : null;
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

// Checkout logic
exports.checkout = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // Step 1: Validate Cart
    const cartDetails = await CartModel.getCartDetails(cartId);
    if (!cartDetails || cartDetails.length === 0) {
      return res.status(404).json({ error: "Cart not found or is empty" });
    }

    // Step 2: Process Payment (placeholder logic)
    // Assume payment processing is successful
    const paymentStatus = "success";

    if (paymentStatus === "success") {
      // Step 3: Create Order
      const order = await OrderModel.createOrder(cartDetails);

      // Step 4: Clear Cart
      await CartModel.clearCart(cartId);

      // Step 5: Respond with order details
      return res.status(200).json({ message: "Checkout successful", order });
    } else {
      // Handle payment failure
      return res.status(400).json({ error: "Payment processing failed" });
    }
  } catch (error) {
    console.error("Error during checkout:", error);

    // Respond with a meaningful error message
    return res.status(500).json({
      error: "Internal Server Error during checkout",
      details: error.message,
    });
  }
};
