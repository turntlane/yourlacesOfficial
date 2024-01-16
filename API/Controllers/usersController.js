const db = require("../Models/index");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();

    if (allUsers.length < 1) {
      return res.status(500).send("No Users");
    }
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { username, email, password, roles } = req.body;

  console.log("req body", req.body);

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, email, password: hashedPwd }
      : { username, email, password: hashedPwd, roles };

  console.log("user obj", userObject);

  // Create and store new user
  const user = await db.User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await db.User.findOne({ where: { id: id } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await db.User.findOne({ where: { username: username } });

  // Allow updates to the original user
  if (duplicate && duplicate?.id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { userID } = req.body;

  // Confirm data
  if (!userID) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await db.User.findOne({ where: { userID: userID } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.destroy();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const getUserByID = async (req, res) => {
  const { userID } = req.user.userID;

  console.log("req.user.userID", userID);

  try {
    // Confirm data
    if (!userID) {
      return res.status(400).json({ message: "User ID Required" });
    }

    // Does the user exist to delete?
    const user = await db.User.findOne({ where: { userID: userID } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        contactInfo: user.contactInfo,
        userRating: user.userRating,
        roles: user.roles,
        createdAt: user.createdAt,
      },
    });
    // res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createNewUser,
  updateUser,
  deleteUser,
};
