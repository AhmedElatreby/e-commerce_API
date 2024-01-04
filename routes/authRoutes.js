const express = require("express");
const passport = require("passport"); // Import passport here
const router = express.Router();
const AuthController = require("../controller/userController");
const UserModel = require("../models/user");

// router.use("/", AuthController);

// login route
router.get("/login", (req, res) => {
  req.flash("error", ""); // Clear flash messages
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(); // Destroy the session
    res.redirect("/auth/login"); // Redirect to home or login page
  });
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      // Authentication failed
      req.flash("error", info.message);
      return res.redirect("/auth/login");
    }
    // Authentication successful
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      console.log("Authentication successful:", req.user);
      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

router.get("/user", async (req, res) => {
  try {
    const allUsers = await UserModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if userId is a valid integer
    if (!Number.isInteger(Number(userId))) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await UserModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const user = await UserModel.updateUser(userId, updatedUser);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.deleteUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
