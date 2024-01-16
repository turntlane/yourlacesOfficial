const User = require("../Models/users");
const ForumPost = require("../Models/forumPost");

User.hasMany(ForumPost, { foreignKey: "userID", as: "posts" });
ForumPost.belongsTo(User, { foreignKey: "userID", as: "user" });

module.exports = {
  User,
  ForumPost,
};
