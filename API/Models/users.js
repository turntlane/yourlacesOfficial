// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
// require("dotenv").config();
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

const User = sequelize.define("testusers3", {
  id: {
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
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ["user"],
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Create the table if it doesn't exist
User.sync();

module.exports = User;
