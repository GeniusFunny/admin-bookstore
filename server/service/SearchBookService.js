const searchBookDao = require('../dao/book').seacrchBookDao

async function searchBookService(bookname, author) {
  let data = await searchBookDao(`%${bookname}%`, `%${author}%`)
  return data
}

module.exports = searchBookService