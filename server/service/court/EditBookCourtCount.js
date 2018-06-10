const editBookCourtCountDao = require('../../dao/court').editBookCourtCountDao

async function editBookCourtCountService (newCount, userId, bookId) {
  return await editBookCourtCountDao(newCount, userId, bookId)
}

module.exports = editBookCourtCountService