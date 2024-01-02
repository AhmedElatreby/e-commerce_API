const express = require("express");
const passport = require("passport"); // Import passport here
const router = express.Router();
const AuthController = require("../controller/userController");
const UserModel = require("../models/user");

router.use("/", AuthController);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
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
    const user = await UserModel.getUserById(userId);
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
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
