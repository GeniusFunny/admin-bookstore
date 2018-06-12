const searchBookDao = require('../../dao/book').seacrchBookDao

async function searchBookService(bookName, author) {
  let data = await searchBookDao(`%${bookName}%`, `%${author}%`)
  return data
}

module.exports = searchBookService