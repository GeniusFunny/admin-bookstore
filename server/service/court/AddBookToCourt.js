const addBookToCourtDao = require('../../dao/court').addBookToCourtDao
async function addBookToCourt(userid, bookid) {
  let data = await addBookToCourtDao(userid, bookid)
  return data
}
module.exports = addBookToCourt