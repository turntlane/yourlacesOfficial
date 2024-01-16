// models/User.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConn");

const User = sequelize.define("testusers", {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure that the email field is a valid email address
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ["user"],
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
User.sync();

module.exports = User;
