const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  database: "node_complete",
  user: "root",
  password: "1234"
});

module.exports = pool.promise();
