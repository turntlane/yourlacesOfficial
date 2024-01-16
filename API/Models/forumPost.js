const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConn");

const ForumPost = sequelize.define("ForumPost", {
  postID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
ForumPost.sync();

module.exports = ForumPost;
