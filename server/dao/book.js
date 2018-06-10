const query = require('../utils/query')

const sql = {
  getList: `
    SELECT *
    FROM book
  `,
  insert: `
    INSERT INTO book(bookname, author, price)
      VALUES(?, ?, ?)
  `,
  delete: `
    DELETE FROM book
    WHERE bookId=?
  `,
  search: `
    SELECT *
    FROM book
    WHERE bookname like ? or author like ?
  `,
  find: `
    SELECT *
    FROM book
    WHERE bookId=?
  `
}

async function getBookListDao () {
  return await query(sql.getList)
}

async function getBookDao (bookId) {
  let source = [bookId]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let res = await query(sql.find, source)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: res[0]
    }
  } catch (e) {
    console.error(e, '查询失败')
  }
  return data
}

async function insertBookDao(bookname, author, price) {
  let source = [bookname, author, price]
  let data = await query(sql.insert, source)
  return data
}

async function deleteBookDao(bookId) {
  let data = await query(sql.delete, bookId)
  return data
}

async function searchBookDao(bookname, author) {
  let source = [bookname, author]
  let data = await query(sql.search, source)
  return data
}

exports.insertBookDao = insertBookDao
exports.getBookListDao = getBookListDao
exports.deleteBookDao = deleteBookDao
exports.seacrchBookDao = searchBookDao
exports.getBookDao = getBookDao

