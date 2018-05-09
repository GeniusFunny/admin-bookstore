const express = require('express')
const mysql = require('mysql')

const app = new express()
const port = process.env.PORT || 5000
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '19980812',
  database: 'bookstore',
  port: '3306'
})

connection.connect()

connection.query('SELECT * FROM user;', function(err, res) {
  if (err) {
    console.log(err)
  }
  console.log('打印数据库')
  console.log(res[0])
})

connection.end()
app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello, from Express'
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
