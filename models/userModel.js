const bcrypt = require("bcrypt");
const db = require("../db/db");

const getAllUsers = async () => {
  try {
    const result = await db.any("SELECT * FROM Users");
    console.log("Query Result:", result);
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const result = await db.oneOrNone("SELECT * FROM Users WHERE user_id = $1", [userId]);
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const result = await db.oneOrNone("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await db.oneOrNone("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const createUser = async (username, password, email, first_name, last_name) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the hashed password into the database
    const result = await db.one(
      "INSERT INTO Users (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, hashedPassword, email, first_name, last_name]
    );

    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};


const deleteUser = async (userId) => {
  try {
    const result = await db.one(
      "DELETE FROM Users WHERE user_id = $1 RETURNING *",
      [userId]
    );
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

const updateUser = async (userId, updatedUser) => {
  try {
    const result = await db.one(
      "UPDATE Users SET username = $1, password = $2, email = $3, first_name = $4, last_name = $5  WHERE user_id = $6 RETURNING *",
      [
        updatedUser.username,
        updatedUser.password,
        updatedUser.email,
        updatedUser.first_name,
        updatedUser.last_name,
        userId,
      ]
    );
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
};
