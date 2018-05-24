const Koa = require('koa')
// const mysql = require('mysql')

const app = new Koa();
// const port = process.env.PORT || 5000
// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '19980812',
//   database: 'bookstore',
//   port: '3306'
// });

// connection.connect()

app.use(async ctx => {
  ctx.body = 'Hello, World'
});

app.listen(5000, () => console.log('Listening on port 5000'))
