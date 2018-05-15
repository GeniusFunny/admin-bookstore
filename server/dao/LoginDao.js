const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '19980812',
  database: 'bookstore'
})
const id = 2
const sql = `
  SELECT id, password
  FROM user
  WHERE ${id} = id;
  `
connection.connect()

connection.query(sql, (err, res) => {
  if (err) {
    console.log(err)
  }
  console.log(res)
})