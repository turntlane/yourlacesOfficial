const db = require("../Models/index");
const {
  awsMiddleware,
  generateFileName,
  s3Client,
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
} = require("../Middleware/awsMiddleware");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require("sharp");

// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const PostComments = require("../Models/postComments");

// @desc Get all Post Comments
// @route GET /threads
// @access Private
const getAllPostComments = async (req, res) => {
  try {
    const allPostComments = await db.PostComments.findAll({
      include: [
        {
          model: db.User,
          attributes: { exclude: ["userID", "contactInfo", "password"] },
        },
        // Ensure that the commentImages field is included here
        // The exact code depends on how your models and relations are set up
      ],
    });

    if (allPostComments.length < 1) {
      return res.status(500).send("No Comments");
    }

    // Process each comment to add commentImageUrls
    for (const comment of allPostComments) {
      if (comment.commentImages && comment.commentImages.length > 0) {
        // Use Promise.all to handle multiple asynchronous operations
        comment.dataValues.commentImageUrls = await Promise.all(
          comment.commentImages.map(async (imageName) => {
            return await getSignedUrl(
              s3Client,
              new GetObjectCommand({
                Bucket: bucketName,
                Key: imageName,
              }),
              { expiresIn: 60 * 60 * 24 } // 1 day?
            );
          })
        );
      } else {
        comment.dataValues.commentImageUrls = [];
      }
    }

    res.status(200).json({ comments: allPostComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get post comments
// @route GET /threads/:id
// @access Private
const getAllPostCommentsByPostID = async (req, res) => {
  const postID = req.params.postID;
  try {
    const allPostComments = await db.PostComments.findAll({
      include: [
        {
          model: db.User,
          attributes: { exclude: ["userID", "contactInfo", "password"] },
        },
      ],
      where: { postID: postID },
    });

    if (allPostComments.length < 1) {
      return res.status(500).send("No Comments");
    }

    // Process each comment to add commentImageUrls
    for (const comment of allPostComments) {
      if (comment.commentImages && comment.commentImages.length > 0) {
        // Use Promise.all to handle multiple asynchronous operations
        comment.dataValues.commentImageUrls = await Promise.all(
          comment.commentImages.map(async (imageName) => {
            return await getSignedUrl(
              s3Client,
              new GetObjectCommand({
                Bucket: bucketName,
                Key: imageName,
              }),
              { expiresIn: 60 * 60 * 24 } // 1 day?
            );
          })
        );
      } else {
        comment.dataValues.commentImageUrls = [];
      }
    }

    res.status(200).json({ comments: allPostComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create new post comment
// @route POST /threads
// @access Private
const createNewPostComment = async (req, res) => {
  const { username, content, postID, userID, parentCommentID } = req.body;
  const imagesFiles = req.files;

  console.log("this is the image body: ", req.body);
  console.log("this is the image file: ", req.files);

  try {
    // Confirm data
    if (!username || !content || !postID || !userID || !parentCommentID) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findByPostID = await db.ForumPost.findByPk(postID);
    if (!findByPostID) {
      return res.status(404).json({ message: "Post not found" });
    }

    let imagePaths = [];
    if (imagesFiles && imagesFiles.length > 0) {
      imagePaths = await uploadImages(imagesFiles);
    }

    console.log("these are image paths: ", imagePaths);

    const postObject = {
      username,
      content,
      postID,
      userID,
      parentCommentID,
      commentImages: imagePaths ?? "",
    };

    console.log("user obj", postObject);

    // Create and store new user
    const comment = await db.PostComments.create(postObject);

    if (comment) {
      //created
      res.status(201).json({ message: `New post ${content} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    console.log("this is bad: ", error);
    res.status(400).json({ message: "Invalid user data received", error });
  }
};

const uploadImages = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const filename = generateFileName();
    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 500, width: 500, fit: "cover" })
      .toBuffer();
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: filename,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    return filename; // Assuming filename is the path needed
  });

  return await Promise.all(uploadPromises);
};

module.exports = {
  getAllPostComments,
  getAllPostCommentsByPostID,
  createNewPostComment,
};
