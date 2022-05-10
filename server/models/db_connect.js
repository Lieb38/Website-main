require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PSWD,
  database: process.env.MYSQL_DB
});

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createQuery = "CREATE DATABASE IF NOT EXISTS bmi_db;";
con.query(createQuery);

module.exports = { con, query };

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!!");
//     con.query("CREATE DATABASE IF NOT EXISTS questions_db;", function (err, result) {
//         if (err) throw err;
//         crossOriginIsolated.log("Database created");
//     });
// });

module.exports = { con, query };