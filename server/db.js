const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "yixinlee",
  password: "Qwerty123@",
  port: 5432,
  database: "authtodo"
});

module.exports = pool;
