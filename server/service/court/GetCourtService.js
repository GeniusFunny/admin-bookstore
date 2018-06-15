const getCourtDao = require('../../dao/court').getCourtDao
const getBookService = require('../book/GetBookService')

async function getCourtService(userId) {
  let res = {
    status: 1,
    message: '获取购物车列表失败'
  }
  try {
    let courtList = await getCourtDao(userId)
    res = {
      status: 0,
      message: 'SUCCESS',
      data: []
    }
    try {
      for (let item of courtList) {
        let book = await getBookService(item.bookId)
        book.data.count = item.count
        res.data.push(book.data)
      }
    } catch (e) {
      console.error(e, '获取书籍失败')
    }
  } catch (e) {
    console.error(e, '获取购物车列表失败')
  }
  return res
}

module.exports = getCourtService