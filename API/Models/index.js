const { Sequelize } = require("sequelize");
const { connectDb } = require("../Config/dbConn");
connectDb();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

const User = require("./users");
const ForumPost = require("./forumPost");
const ForumCategory = require("./forumCategory");
const PostComments = require("./postComments");

// User to ForumPost (One-to-Many)
User.hasMany(ForumPost, { foreignKey: "userID" });
User.hasMany(PostComments, { foreignKey: "userID" });

ForumPost.hasMany(PostComments, { foreignKey: "postID" });
ForumPost.belongsTo(User, { foreignKey: "userID" });

PostComments.belongsTo(User, { foreignKey: "userID" });
PostComments.belongsTo(ForumPost, { foreignKey: "postID" });

// ForumCategory to ForumPost (One-to-Many)
ForumCategory.hasMany(ForumPost, { foreignKey: "categoryID" });
ForumPost.belongsTo(ForumCategory, { foreignKey: "categoryID" });

// Comment-Comment Association for nested comments
PostComments.hasMany(PostComments, {
  // as: "replies",
  foreignKey: "parentCommentID",
});
PostComments.belongsTo(PostComments, {
  // as: "parentComment",
  foreignKey: "parentCommentID",
});

module.exports = {
  sequelize,
  User,
  ForumPost,
  ForumCategory,
  PostComments,
};
