const express = require("express");
const router = express.Router();
const forumPost = require("../Controllers/forumPostController");
const verifyJWT = require("../Middleware/verifyJWT");

router.route("/category/:id").get(forumPost.getAllPostsFromCategoryID);

// router.use(verifyJWT);

router
  .route("/")
  .get(forumPost.getAllPosts)
  .post(forumPost.createNewPost)
  .put(forumPost.updatePost)
  .delete(forumPost.deletePost);

router.route("/category/:id").put(forumPost.updatePost);

router.route("/:userID").get(forumPost.getAllPostsFromUserID);

module.exports = router;
