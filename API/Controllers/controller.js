const pool = require("../DB/database");
const queries = require("../Queries/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/users");

// get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    if(allUsers.length < 1) {
     return res.status(500).send('No Users')
    }
    res.status(200).json({users: allUsers})
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }



  // pool.query(queries.getUsers, (error, results) => {
  //   if (error) {
  //     return error;
  //   } else {
  //     res.status(200).json(results.rows);
  //   }
  // });
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await User.findAll({where: {id: userId}})
    if(user.length < 1) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({users: user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // const user_id = parseInt(req.params.user_id);
  // pool.query(queries.getUserById, [user_id], (error, results) => {
  //   if (error) {
  //     res.sendStatus(500);
  //     return error;
  //   } else {
  //     res.status(200).json(results.rows);
  //   }
  // });
};

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //jwt token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // Token expiration time
      }
    );

    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const addUser = (req, res) => {
//   const {
//     username,
//     email,
//     password_hash,
//     registration_date,
//     profile_picture,
//     bio,
//     location,
//   } = req.body;
//   //check if email exists
//   pool.query(queries.checkEmailExists, [email], (error, results) => {
//     if (results.rows.length) {
//       res.send("Email Already Exists");
//     }
//     //if email doesnt exist add user
//     pool.query(
//       queries.addUser,
//       [
//         username,
//         email,
//         password_hash,
//         registration_date,
//         profile_picture,
//         bio,
//         location,
//       ],
//       (error, results) => {
//         if (error) {
//           res.sendStatus(500);
//           return error;
//         }
//         res.status(201).send("Student Created Succesfully");
//       }
//     );
//   });
// };

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, email } = req.body;
    const updateValues = {username: username, email: email}
    const user = await User.findAll({where: {id: userId}})
    if(user.length < 1) {
      return res.status(400).json({ message: "User does not exist" });
    }
    await User.update(updateValues, {where: {id: userId}})
    res.status(200).json({message: 'Updated Succesfully', user: updateValues})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  // pool.query(queries.getUserById, [id], (error, results) => {
  //   const noStudentFound = !results.rows.length;
  //   if (noStudentFound) {
  //     return res.send("User Does Not Exist");
  //   }
  //   pool.query(queries.updateUser, [username, id], (error, results) => {
  //     if (error) {
  //       res.sendStatus(500);
  //       return error;
  //     } else {
  //       res.status(200).send("User Updated Succesfully");
  //     }
  //   });
  // });
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await User.destroy({where: {id: userId}})
    if(user.length < 1) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({message: 'User Deleted Succesfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // pool.query(queries.getUserById, [id], (error, results) => {
  //   const noStudentFound = !results.rows.length;
  //   if (noStudentFound) {
  //     return res.send("User Does Not Exist");
  //   }
  //   pool.query(queries.deleteUser, [id], (error, results) => {
  //     if (error) {
  //       res.sendStatus(500);
  //       return error;
  //     } else {
  //       res.status(200).send("User Deleted Succesfully");
  //     }
  //   });
  // });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
};
