const { Pool } = require("pg");
const pgp = require('pg-promise')();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Promisify the query function
pool.query = promisify(pool.query);

function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.apply(pool, [
        ...args,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      ]);
    });
  };
}

module.exports = pool;
