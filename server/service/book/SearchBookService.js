const searchBookDao = require('../../dao/book').seacrchBookDao

async function searchBookService(bookName, author) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await searchBookDao(`%${bookName}%`, `%${author}%`)
    res = {
      status: 1,
      message: 'SUCCESS',
      data: data[0]
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = searchBookService