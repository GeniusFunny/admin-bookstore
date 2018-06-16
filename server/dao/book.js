const query = require('../utils/query')

const sql = {
  getList: `
    SELECT *
    FROM book
  `,
  insert: `
    INSERT INTO book(bookName, author, price, image)
      VALUES(?, ?, ?, ?)
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
  `,
  update: `
    UPDATE book SET
      bookName=?,
      author=?,
      price=?,
      image=?
    WHERE bookId=?
  `
}

async function getBookListDao () {
  return await query(sql.getList, [])
}

async function getBookDao (bookId) {
  return await query(sql.find, [bookId])

}

async function insertBookDao(bookName, author, price, image) {
  return await query(sql.insert, [bookName, author, price, image])
}

async function deleteBookDao(bookId) {
  return await query(sql.delete, [bookId])
}

async function searchBookDao(bookName, author) {
  return await query(sql.search, [bookName, author])
}
async function updateBookDao(bookName, author, price, image, bookId) {
  return await query(sql.update, [bookName, author, price, image, bookId])
}
exports.insertBookDao = insertBookDao
exports.getBookListDao = getBookListDao
exports.deleteBookDao = deleteBookDao
exports.seacrchBookDao = searchBookDao
exports.getBookDao = getBookDao
exports.updateBookDao = updateBookDao

