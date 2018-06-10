const addBookToCourtDao = require('../../dao/court').addBookToCourtDao
async function addBookToCourt(userId, bookId) {
  let data = await addBookToCourtDao(userId, bookId)
  return data
}
module.exports = addBookToCourt