const { Pool } = require("pg");
require("dotenv").config({ path: "./server.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  allowExitOnIdle: true,
});

pool.on("error", (err) => {
  console.error("Error in PostgreSQL pool", err);
});

module.exports = { pool };
