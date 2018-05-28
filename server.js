const Koa = require('koa')
const Router = require('koa-router')
// const mysql = require('mysql')

const app = new Koa()
const router = new Router()
// const port = process.env.PORT || 5000
// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '19980812',
//   database: 'bookstore',
//   port: '3306'
// });

// connection.connect()
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS')
  ctx.set('Access-Control-Max-Age', 3600 * 24)
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  ctx.set('Cache-Control', 'no-cache')
  await next()
})
router
  .get('/test', (ctx ,next) => {
    ctx.body = {
      name: 'genius',
      school: 'Xidian'
    }
  })
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.listen(5000, () => console.log('Listening on port 5000'))
