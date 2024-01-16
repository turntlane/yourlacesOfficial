const express = require("express");
const router = express.Router();
const postComments = require("../Controllers/postCommentsController");
const verifyJWT = require("../Middleware/verifyJWT");
const { awsMiddleware } = require("../Middleware/awsMiddleware");
// router.use(verifyJWT);

router
  .route("/")
  .get(postComments.getAllPostComments)
  .post(awsMiddleware, postComments.createNewPostComment);
//   .put(postComments.updatePost)
//   .delete(postComments.deletePost);

router.route("/:postID").get(postComments.getAllPostCommentsByPostID);

module.exports = router;
