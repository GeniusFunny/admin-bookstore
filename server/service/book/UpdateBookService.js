const updateBookDao = require('../../dao/book').updateBookDao
const getBookService = require('./GetBookService')

async function updateBookService(bookName, author, price, image, bookId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await updateBookDao(bookName, author, price, image, bookId)
    res = {
      status: 1,
      message: 'SUCCESS'
    }
    try {
      let data = await getBookService(bookId)
      res.data = data[0]
    }
    catch (e) {
      console.error(e)
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = updateBookService