const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const register = require('./server/service/user/RegisterService')
const statusFilter = require('./server/utils/statusFiter')
const test = require('./server/service/TestService')
const getBookList = require('./server/service/book/GetBookListService')
const addBook = require('./server/service/book/AddBookService')
const searchBook = require('./server/service/book/SearchBookService')
const addToCourt = require('./server/service/court/AddBookToCourt')
const deleteBook = require('./server/service/court/DeleteBookService')
const getCourt = require('./server/service/court/GetCourtService')
const purchase = require('./server/service/court/PurchaseService')
const login = require('./server/service/user/LoginService')
const app = new Koa()
const router = new Router()
const port = process.env.PORT || 5000

app.use(bodyParser())

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
  .post('/register', async (ctx, next) => {
    let data = ctx.request.body
    ctx.body = await register(data.phone, data.password)
  })
  .post('/login', async (ctx, next) => {
    let data = ctx.request.body
    ctx.body = await login(data.username, data.password)
    if (ctx.body.status === 0) {
      ctx.cookies.set('cid', ctx.body.data.userId, {
        domain: 'localhost:3000',
        path: '/login',
        maxAge: 2 * 3600 * 1000,
        httpOnly: true,
        overwrite: false
      })
    }
  })
  .get('/test', async (ctx, next) => {
    ctx.body = await test(1)
  })
  .get('/bookList', async (ctx, next) => {
    ctx.body = await getBookList()
  })
  .get('/book', async (ctx, next) => {
    ctx.body = await searchBook(ctx.request.query.keyword, ctx.request.query.keyword)
  })
  .post('/book', async (ctx, next) => {
    let data = ctx.request.body
    ctx.body = await addBook(data.bookname, data.author, data.price)
  })
  .put('/court/add', async (ctx, next) => {
    let data = ctx.request.body
    console.log(data.bookId)
    ctx.body = await addToCourt(99, data.bookId)
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(5000, () => console.log('Listening on port 5000'))
