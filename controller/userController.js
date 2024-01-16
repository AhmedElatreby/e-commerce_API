const UserModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
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
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

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
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
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
};
