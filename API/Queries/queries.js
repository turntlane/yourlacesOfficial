const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE user_id = $1";
const addUser =
  "INSERT INTO users (username, email, password_hash, registration_date, profile_picture, bio, location) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const updateUser = "UPDATE users SET username = $1 WHERE user_id = $6";
const deleteUser = "DELETE FROM users WHERE user_id = $1";

module.exports = {
  getUsers,
  getUserById,
  addUser,
  checkEmailExists,
  updateUser,
  deleteUser,
};
