const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecomm_db",
  password: "postgres",
  port: 5432,
});

const query = async (text, params) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query:", { text, duration, rows: result.rowCount });
  return result;
};

module.exports = {
  query,
};
