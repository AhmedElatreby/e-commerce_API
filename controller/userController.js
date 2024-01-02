const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email, first_name, last_name } = req.body;

    const existingUser = await UserModel.getUserByUsername(username);
    const existingEmail = await UserModel.getUserByEmail(email);

    if (existingUser || existingEmail) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await UserModel.createUser(
      username,
      password,
      email,
      first_name,
      last_name
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
