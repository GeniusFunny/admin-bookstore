const query = require('../utils/query')

const sql = {
  addBookToCourt: `
    INSERT INTO court(userId, bookId, count)
      VALUES(?, ?, 1)
  `,
  findBookInCourt: `
    SELECT *
    FROM court
    WHERE userId=? AND bookId=?
  `,
  updateBookCourtCount: `
    UPDATE court SET count=count+1
    WHERE userId=? AND bookId=?
  `,
  getCourt: `
    SELECT bookId, count 
    FROM court
    WHERE userId=?
  `,
  purchase: `
    DELETE FROM court
    WHERE userId=? AND bookId=?
  `,
  delete: `
    DELETE FROM court
    WHERE userId=? AND bookId=?
  `,
  editBookCourtCount: `
    UPDATE court SET count=?
    WHERE userId=? AND bookId=?
  `
}

async function editBookCourtCount (newCount, userId, bookId) {
  return  await query(sql.editBookCourtCount, [newCount, userId, bookId])
}

async function findBook(userId, bookId) {
  return await query(sql.findBookInCourt, [userId, bookId])
}

async function addBookToCourt(userId, bookId) {
  return await query(sql.addBookToCourt, [userId, bookId])
}

async function getCourt(userId) {
  return await query(sql.getCourt, [userId])
}

async function purchase(userId) {
  return await query(sql.purchase, [userId])
}

async function deleteBook(userId, bookId) {
  return await query(sql.delete, [userId, bookId])
}
async function updateBookCount(userId, bookId) {
  return await query(sql.updateBookCourtCount, [userId, bookId])
}
exports.addBookToCourtDao = addBookToCourt
exports.getCourtDao = getCourt
exports.purchaseDao = purchase
exports.deleteBookDao = deleteBook
exports.editBookCourtCountDao = editBookCourtCount
exports.findBookDao = findBook
exports.updateBookCount = updateBookCount