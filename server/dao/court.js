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
  let source = [newCount, userId, bookId]
  let data = {
    status: 0,
    message: 'SUCCESS'
  }
  try {
    await query(sql.editBookCourtCount, source)
  } catch (e) {
    data = {
      status: 1,
      message: 'FAILURE'
    }
  }
  return data
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
      console.error('插入失败', e)
    }
  }
  return data
}

async function getCourt(userId) {
  let source = [userId]
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

async function purchase(userId) {
  let source = []
  source.push(userId)
  let data = await query(sql.purchase, source)
  return data
}

async function deleteBook(userId, bookId) {
  let source = [userId, bookId]
  let res = {
    status: 0,
    message: 'SUCCESS'
  }
  try {
    let data = await query(sql.delete, source)
    console.log(data)
  } catch (e) {
    console.error(e)
    res = {
      status: 1,
      message: 'FAILURE'
    }
  }
  return res
}

exports.addBookToCourtDao = addBookToCourt
exports.getCourtDao = getCourt
exports.purchaseDao = purchase
exports.deleteBookDao = deleteBook
exports.editBookCourtCountDao = editBookCourtCount