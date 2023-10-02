// const Client = require("pg").Client;
require("dotenv").config();

const { Client } = require("pg");
const { Sequelize } = require("sequelize");
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

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// connectDb();

module.exports = connectDb;
