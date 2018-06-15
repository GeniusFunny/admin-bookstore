const editBookCourtCountDao = require('../../dao/court').editBookCourtCountDao

async function editBookCourtCountService (newCount, userId, bookId) {
  let res = {
    status: 0,
    message: 'SUCCESS'
  }
  try {
    await editBookCourtCountDao(newCount, userId, bookId)
  } catch (e) {
    res = {
      status: 1,
      message: 'FAILURE'
    }
  }
  return res
}

module.exports = editBookCourtCountService