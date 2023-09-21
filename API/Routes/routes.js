const { Router } = require("express");
const controller = require("../Controllers/controller");
const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.addUser);
router.post("/login", controller.loginUser);
router.delete("/:id", controller.deleteUser);
router.put("/:id", controller.updateUser);

module.exports = router;
