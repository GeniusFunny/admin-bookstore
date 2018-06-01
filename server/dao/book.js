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
    WHERE bookid=?
  `,
  info: `
    SELECT *
    FROM book_info
    WHERE bookid=?
  `,
  search: `
    SELECT *
    FROM book
    WHERE bookname like ? or author like ?
  `
}

async function getBookListDao () {
  console.log(123)
  let data = await query(sql.getList)
  return data
}

async function insertBookDao(bookname, author, price) {
  let source = []
  source.push(bookname)
  source.push(author)
  source.push(price)
  let data = await query(sql.insert, source)
  return data
}

async function deleteBookDao(bookid) {
  let data = await query(sql.delete, bookid)
  return data
}

async function getBookInfoDao(bookid) {
  let data = await query(sql.info, bookid)
  return data
}
async function searchBookDao(bookname, author) {
  let source = []
  source.push(bookname)
  source.push(author)
  let data = await query(sql.search, source)
  return data
}
exports.insertBookDao = insertBookDao
exports.getBookListDao = getBookListDao
exports.deleteBookDao = deleteBookDao
exports.getBookInfoDao = getBookInfoDao
exports.seacrchBookDao = searchBookDao

