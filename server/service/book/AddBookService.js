const insertBookDao = require('../../dao/book').insertBookDao

async function addBookService(bookName, author, price) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await insertBookDao(bookName, author, price)
    res = {
      status: 1,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = addBookService