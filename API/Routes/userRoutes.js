const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/usersController");
const verifyJWT = require("../Middleware/verifyJWT");

// router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .get(usersController.getUserByID)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
