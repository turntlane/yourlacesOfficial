const { Router } = require("express");
const controller = require("../Controllers/controller");
require("../Config/dbConn");
const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.addUser);
router.post("/login", controller.loginUser);
router.delete("/:id", controller.deleteUser);
router.put("/:id", controller.updateUser);
router.post("/check", controller.checkEmail);

module.exports = router;
