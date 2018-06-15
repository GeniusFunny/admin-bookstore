const getBookDao = require('../../dao/book').getBookDao

async function GetBookService (bookId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getBookDao(bookId)
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
module.exports = GetBookService