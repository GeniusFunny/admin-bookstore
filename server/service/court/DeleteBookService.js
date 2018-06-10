const deleteBookDao = require('../../dao/court').deleteBookDao

async function deleteBookService(userId, bookId) {
  console.log(userId, bookId)
  return await deleteBookDao(userId, bookId)
}
module.exports = deleteBookService