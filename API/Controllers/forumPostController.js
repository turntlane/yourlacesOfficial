const db = require("../Models/index");
const PostComments = require("../Models/postComments");

// @desc Get all Posts
// @route GET /posts
// @access Private
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await db.ForumPost.findAll({
      include: [
        {
          model: db.PostComments,
          // as: "comments",
        },
        {
          model: db.User,
        },
      ],
    });

    if (allPosts.length < 1) {
      return res.status(500).send("No Posts");
    }
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get user posts
// @route GET /posts
// @access Private
const getAllPostsFromUserID = async (req, res) => {
  const userID = req.params.userID;
  try {
    const allPosts = await db.ForumPost.findAll({
      where: { userID: userID },
    });

    if (allPosts.length < 1) {
      return res.status(500).send("No Posts");
    }
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get all Posts from categoryID
// @route GET /posts
// @access Private
const getAllPostsFromCategoryID = async (req, res) => {
  const categoryID = req.params.id;
  console.log("cat: ", categoryID);
  try {
    const allPosts = await db.ForumPost.findAll({
      include: [
        {
          model: db.PostComments,
        },
        {
          model: db.User,
        },
      ],
      where: { categoryID: categoryID },
    });

    if (allPosts.length < 1) {
      return res.status(500).json({ message: "No Posts" });
    }
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create new post
// @route POST /posts
// @access Private
const createNewPost = async (req, res) => {
  const { username, title, content, userID, categoryID } = req.body;

  console.log("req body", req.body);
  try {
    // Confirm data
    if (!username || !title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const category = await db.ForumCategory.findByPk(categoryID);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const postObject = { username, title, content, userID, categoryID };

    console.log("user obj", postObject);

    // Create and store new user
    const post = await db.ForumPost.create(postObject);

    console.log("we are here");
    if (post) {
      //created
      res.status(201).json({ message: `New post ${title} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    console.log("this is bad: ", error);
    res.status(400).json({ message: "Invalid user data received", error });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updatePost = async (req, res) => {
  const postID = req.params.id;
  const { title, content, userID } = req.body;
  try {
    // Confirm data
    // if (
    //   !id ||
    //   !username ||
    //   !Array.isArray(roles) ||
    //   !roles.length ||
    //   typeof active !== "boolean"
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "All fields except password are required" });
    // }

    // Does the user exist to update?
    const user = await db.User.findOne({ where: { userID: userID } });

    if (!user) {
      return res.status(400).json({ message: "Permission Denied" });
    }

    const updateBody = { title, content };

    const updatedPost = await db.ForumPost.update(updateBody, {
      where: { postID: postID },
    });
    if (updatedPost) {
      res.status(200).json({
        message: `Post updated: Title: ${title} 
        Content: ${content}`,
      });
    }
  } catch (error) {
    console.log("this is bad: ", error);

    res.status(404).json({ message: "Something went wrong", error });
  }
};

// @desc Delete a post
// @route DELETE /posts
// @access Private
const deletePost = async (req, res) => {
  try {
    const { postID, userID } = req.body;

    // Confirm data
    if (!postID) {
      return res.status(400).json({ message: "Cannot find post" });
    }

    // Does the post exist to delete?
    const post = await db.ForumPost.findOne({
      where: { postID: postID, userID: userID },
    });

    if (!post) {
      return res.status(400).json({ message: "Error Deleting Post" });
    }

    const result = await post.destroy();

    console.log("result: ", result);

    const reply = `Post deleted!`;

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};

module.exports = {
  getAllPosts,
  getAllPostsFromUserID,
  getAllPostsFromCategoryID,
  createNewPost,
  updatePost,
  deletePost,
};
