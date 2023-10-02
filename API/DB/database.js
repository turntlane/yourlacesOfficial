const Pool = require("pg").Pool;
const pg = require("pg");
require("dotenv").config();

// const client = new pg.Client(process.env.PG_CON_STRING);
// client.connect();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

module.exports = pool;
