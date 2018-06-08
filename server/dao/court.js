const query = require('../utils/query')
const sql = {
  addBookToCourt: `
    INSERT INTO court(userId, bookId, count)
      VALUES(?, ?, 1)
  `,
  findBookInCourt: `
    SELECT *
    FROM court
    WHERE userid=? AND bookid=?
  `,
  updateBookCourtCount: `
    UPDATE court SET count=count+1
    WHERE userid=? AND bookid=?
  `,
  getCourt: `
    SELECT bookid, count 
    FROM court
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
async function findBook(userId, bookId) {
  let source = [userId, bookId]
  let data = await query(sql.findBookInCourt, source)
  return data.length !== 0
}
async function addBookToCourt(userId, bookId) {
  let source = [userId, bookId]
  let isExisting
  let data = {
    status: 1,
    message: '加入购物车失败'
  }
  try {
    isExisting = await findBook(userId, bookId)
  } catch (e) {
    console.error('查询失败')
  }
  if (isExisting) {
    try {
      await query(sql.updateBookCourtCount, source)
      data = {
        status: 0,
        message: 'SUCCESS'
      }
    } catch (e) {
      console.error('更新失败', e)
    }
  } else {
    try {
      await query(sql.addBookToCourt, source)
      data = {
        status: 0,
        message: 'SUCCESS'
      }
    } catch (e) {
      console.error('插入失败')
    }
  }
  return data
}

async function getCourt(userid) {
  let source = [userid]
  let data = {
    status: 1,
    message: '获取购物车列表失败'
  }
  try {
    let res = await query(sql.getCourt, source)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: res
    }
  } catch (e) {
    console.error(e, '查询失败')
  }
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