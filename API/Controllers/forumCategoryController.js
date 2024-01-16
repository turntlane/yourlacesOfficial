const db = require("../Models/index");

// @desc Get all Categories
// @route GET /forum-category
// @access Private
const getAllCategories = async (req, res) => {
  try {
    const allPostCategories = await db.ForumCategory.findAll();

    if (allPostCategories.length < 1) {
      return res.status(500).send("No categories");
    }
    res.status(200).json({ categories: allPostCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create new post category
// @route POST / forum-category
// @access Private
const createNewCategory = async (req, res) => {
  const { name, description } = req.body;

  console.log("req body", req.body);
  try {
    // Confirm data
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const postObject = { name, description };

    console.log("user obj", postObject);

    // Create and store new user
    const post = await db.ForumCategory.create(postObject);

    console.log("we are here");
    if (post) {
      //created
      res.status(201).json({ message: `New category '${name}' created` });
    } else {
      res.status(400).json({ message: "Error" });
    }
  } catch (error) {
    console.log("this is bad: ", error);
    res.status(400).json({ message: "Invalid data received", error });
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
};
