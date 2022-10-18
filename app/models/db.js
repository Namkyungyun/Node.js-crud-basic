const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

// db connection object 생성
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});


// MySQL connection 실행
connection.connect(error => {
  if(error) throw error;
  console.log("Successfully connected to the database.");
})


module.exports = connection;