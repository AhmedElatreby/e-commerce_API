const bcrypt = require("bcrypt");
const { query } = require("../db/db");

const getAllUsers = async () => {
  const result = await query("SELECT * FROM Users");
  return result.rows;
};

const getUserById = async (userId) => {
  const result = await query("SELECT * FROM Users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await query("SELECT * FROM Users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await query("SELECT * FROM Users WHERE email = $1", [email]);
  return result.rows[0];
};

const createUser = async (username, password, email, first_name, last_name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await query(
    "INSERT INTO Users (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, hashedPassword, email, first_name, last_name]
  );
  return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await query(
    "DELETE FROM Users WHERE user_id = $1 RETURNING *",
    [userId]
  );
  return result.rows[0];
};

const updateUser = async (userId, updatedUser) => {
  const result = await query(
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
  return result.rows[0];
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
