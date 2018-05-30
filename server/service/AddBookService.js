const insertBookDao = require('../dao/book').insertBookDao

async function addBookService(bookname, author, price) {
  let data = await insertBookDao(bookname, author, price)
  return data
}

module.exports = addBookService