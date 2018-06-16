const deleteBookDao = require('../../dao/book').deleteBookDao

async function deleteBookService(bookId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await deleteBookDao(bookId)
    res = {
      status: 1,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = deleteBookService