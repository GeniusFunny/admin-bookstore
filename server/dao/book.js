const query = require('../utils/query')

const sql = {
  getList: `
    SELECT *
    FROM book
  `,
  insert: `
    INSERT INTO book(bookName, author, price)
      VALUES(?, ?, ?)
  `,
  delete: `
    DELETE FROM book
    WHERE bookId=?
  `,
  search: `
    SELECT *
    FROM book
    WHERE bookName like ? or author like ?
  `,
  find: `
    SELECT *
    FROM book
    WHERE bookId=?
  `
}

async function getBookListDao () {
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let res = await query(sql.getList)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: res
    }
  } catch (e) {
    console.error(e)
  }
  return data
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

async function insertBookDao(bookName, author, price) {
  let source = [bookName, author, price]
  let data = await query(sql.insert, source)
  return data
}

async function deleteBookDao(bookId) {
  let data = await query(sql.delete, bookId)
  return data
}

async function searchBookDao(bookName, author) {
  let source = [bookName, author]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let res = await query(sql.search, source)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: res
    }
  } catch (e) {
    console.error(e)
  }
  return data
}

exports.insertBookDao = insertBookDao
exports.getBookListDao = getBookListDao
exports.deleteBookDao = deleteBookDao
exports.seacrchBookDao = searchBookDao
exports.getBookDao = getBookDao

