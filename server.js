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

const urlIsPublic= (url, method) => {
  if (method === 'OPTIONS') {
    return true
  }
  if (method !== 'GET') {
    return (url === '/login' || url === '/register')
  } else {
    return url.indexOf('court') === -1
  }
}
app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS')
  ctx.set('Access-Control-Max-Age', 3600 * 24)
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  ctx.set('Cache-Control', 'no-cache')
  await next()
})
  .use(async (ctx, next) => {
    if (urlIsPublic(ctx.request.url, ctx.request.method)) {
      await next()
    } else {
      let userId
      try {
        userId = ctx.request.header.cookie.split(';').find((item) => item.indexOf('userId') !== -1).split('=')[1]
      } catch (e) {
        userId = 0
      }
      if (userId) {
        ctx.request.userId = userId
        await next()
      } else {
        ctx.status = 401
      }
    }
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
      ctx.cookies.set('userId', `${ctx.body.data.userId}`, {
        maxAge: 7 * 24 * 3600 * 1000
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
    ctx.body = await addToCourt(ctx.request.userId, data.bookId)
  })
  .get('/court/list', async (ctx, next) => {
    ctx.body = await getCourt(ctx.request.userId)
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => console.log('Listening on port 5000'))
