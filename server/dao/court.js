const query = require('../utils/query')
const sql = {
  addBookToCourt: `
    INSERT TO court(userId, bookId, count)
      VALUES(?, ?, 1)
  `,
  getCourt: `
    SELECT * FROM court
    WHERE userid=?
  `,
  purchase: `
    DELETE FROM court
    WHERE userid=?
  `,
  delete: `
    DELETE FROM court
    WHERE userid=? AND bookid=?
  `
}

async function addBookToCourt(userid, bookid) {
  let source = []
  source.push(userid, bookid)
  let data = await query(sql.addBookToCourt, source)
  return data
}

async function getCourt(userid) {
  let source = []
  source.push(userid)
  let data = await query(sql.getCourt)
  return data
}
async function purchase(userid) {
  let source = []
  source.push(userid)
  let data = await query(sql.purchase, source)
  return data
}

async function deleteBook(userid, bookid) {
  let source = []
  source.push(userid, bookid)
  let data = await query(sql.delete, source)
  return data
}

exports.addBookToCourtDao = addBookToCourt
exports.getCourtDao = getCourt
exports.purchaseDao = purchase
exports.deleteBookDao = deleteBook