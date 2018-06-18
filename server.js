const Koa = require('koa')
const Router = require('koa-router')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const bodyParser = require('koa-bodyparser')
const register = require('./server/service/user/RegisterService')
const statusFilter = require('./server/utils/statusFiter')
const getUserInfo = require('./server/service/userInfo/GetUserInfoService')
const updateUserInfo = require('./server/service/userInfo/UpdateUserInfoService')
const getBookList = require('./server/service/book/GetBookListService')
const addBook = require('./server/service/book/AddBookService')
const updateBook = require('./server/service/book/UpdateBookService')
const searchBook = require('./server/service/book/SearchBookService')
const getBookInfo = require('./server/service/book/GetBookService')
const addToCourt = require('./server/service/court/AddBookToCourt')
const deleteBook = require('./server/service/court/DeleteBookService')
const getCourt = require('./server/service/court/GetCourtService')
const purchase = require('./server/service/court/PurchaseService')
const login = require('./server/service/user/LoginService')
const editBookCourtCount = require('./server/service/court/EditBookCourtCount')
const addBill = require('./server/service/bill/AddBillService')
const getBill = require('./server/service/bill/GetBillService')
const getBillListManagement = require('./server/service/management/GetBillListService')
const getUserListManagement = require('./server/service/management/GetUserListService')
const getBookListManagement = require('./server/service/management/GetBookListService')
const deleteBookManagement = require('./server/service/book/DeleteBookService')
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
    return url.indexOf('court') === -1 && url.indexOf('user') === -1
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
  .post('/register', async (ctx) => {
    let data = ctx.request.body
    ctx.body = await register(data.phone, data.password)
  })
  .post('/login', async (ctx) => {
    let data = ctx.request.body
    ctx.body = await login(data.username, data.password)
    if (ctx.body.status === 0) {
      ctx.cookies.set('userId', `${ctx.body.data.userId}`, {
        maxAge: 7 * 24 * 3600 * 1000
      })
    }
  })
  .get('/bookList', async (ctx) => {
    ctx.body = await getBookList()
  })
  .get('/book', async (ctx) => {
    ctx.body = await searchBook(ctx.request.query.keyWord, ctx.request.query.keyWord)
  })
  .post('/book', async (ctx) => {
    let data = ctx.request.body
    ctx.body = await addBook(data.bookName, data.author, data.price)
  })
  .put('/court/add', async (ctx) => {
    let data = ctx.request.body
    ctx.body = await addToCourt(ctx.request.userId, data.bookId)
  })
  .get('/book/:id', async (ctx) => {
    ctx.body = await getBookInfo(ctx.params.id)
  })
  .get('/court/list', async (ctx) => {
    ctx.body = await getCourt(ctx.request.userId)
  })
  .post('/court/book', async (ctx) => {
    ctx.body = await editBookCourtCount(ctx.request.body.count, ctx.request.userId, ctx.request.body.bookId)
  })
  .delete('/court/book', async (ctx) => {
    ctx.body = await deleteBook(ctx.request.userId, ctx.request.body.bookId)
  })
  .get('/user/info', async (ctx) => {
    ctx.body = await getUserInfo(ctx.request.userId)
  })
  .post('/user/info', async (ctx) => {
    ctx.body = await updateUserInfo(ctx.request.body.username, ctx.request.userId)
  })
  .get('/user/bill', async (ctx) => {
    ctx.body = await getBill(ctx.request.userId)
  })
  .post('/user/bill', async (ctx) => {
    ctx.body = await addBill(ctx.request.userId, ctx.request.body.money)
  })
  .get('/management/billList', async (ctx) => {
      ctx.body = await getBillListManagement()
  })
  .get('/management/bookList', async (ctx) => {
    ctx.body = await getBookListManagement()
  })
  .get('/management/userList', async (ctx) => {
    ctx.body = await getUserListManagement()
  })
  .post('/management/book', async (ctx) => {
    let data = ctx.request.body
    if (data.bookId === -1) {
      ctx.body = await addBook(data.bookName, data.author, data.price, data.image)
    } else {
      ctx.body = await updateBook(data.bookName, data.author, data.price, data.image, data.bookId)
    }
  })
  .delete('/management/book/:id', async (ctx) => {
      ctx.body = await deleteBookManagement(ctx.params.id)
  })
  .post('/court/purchase', async (ctx) => {
    ctx.body = await purchase(ctx.request.userId, ctx.request.body.books, ctx.request.body.money)
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => console.log('Listening on port 5000'))
