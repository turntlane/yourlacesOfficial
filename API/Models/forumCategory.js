const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConn");

const ForumCategory = sequelize.define("ForumCategory", {
  categoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
ForumCategory.sync();

module.exports = ForumCategory;
