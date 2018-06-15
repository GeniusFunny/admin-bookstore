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
  return await query(sql.getList, [])
}

async function getBookDao (bookId) {
  return await query(sql.find, [bookId])

}

async function insertBookDao(bookName, author, price) {
  return await query(sql.insert, [bookName, author, price])
}

async function deleteBookDao(bookId) {
  return await query(sql.delete, [bookId])
}

async function searchBookDao(bookName, author) {
  return await query(sql.search, [bookName, author])
}

exports.insertBookDao = insertBookDao
exports.getBookListDao = getBookListDao
exports.deleteBookDao = deleteBookDao
exports.seacrchBookDao = searchBookDao
exports.getBookDao = getBookDao

