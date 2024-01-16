const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../Config/dbConn");
const ForumPost = require("./forumPost");
const User = require("./users");

const PostComments = sequelize.define(
  "comments",
  {
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    postID: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: ForumPost, // name of the target model
      //   key: "postID", // key in the target model
      // },
    },
    userID: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User, // name of the target model
      //   key: "userID", // key in the target model
      // },
    },
    parentCommentID: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: "comments", // refers to the same table for nested comments
      //   key: "commentID",
      // },
    },
    // ParentCommentID is implicitly created by the association below
    commentImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    // timestamps: false,
    // tableName: "Comments",
  }
);
PostComments.sync();

module.exports = PostComments;
