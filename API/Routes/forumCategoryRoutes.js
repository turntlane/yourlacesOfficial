const express = require("express");
const router = express.Router();
const forumCategory = require("../Controllers/forumCategoryController");
const verifyJWT = require("../Middleware/verifyJWT");

router.route("/").get(forumCategory.getAllCategories);

router.use(verifyJWT);

router
  .route("/")
  // .get(forumCategory.getAllCategories)
  .post(forumCategory.createNewCategory);
//   .patch(forumCategory.updateUser)
//   .delete(forumCategory.deletePost);

module.exports = router;
