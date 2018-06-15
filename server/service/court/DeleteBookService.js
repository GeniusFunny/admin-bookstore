const deleteBookDao = require('../../dao/court').deleteBookDao

async function deleteBookService(userId, bookId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await deleteBookDao(userId, bookId)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = deleteBookService