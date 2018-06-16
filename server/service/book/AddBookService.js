const insertBookDao = require('../../dao/book').insertBookDao
async function addBookService(bookName, author, price, image) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await insertBookDao(bookName, author, price, image)
    res = {
      status: 1,
      message: 'SUCCESS',
      data: {
        bookId: data.insertId
      }
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = addBookService