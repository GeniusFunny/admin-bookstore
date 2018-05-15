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

app.get('/api/hello', (req, res) => {
  res.send({
    userId: 1
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
