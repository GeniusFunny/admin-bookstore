const addBookToCourtDao = require('../../dao/court').addBookToCourtDao
const updateBookDao = require('../../dao/court').updateBookCount
const findBookDao = require('../../dao/court').findBookDao

/*
  @code
  1：  判断失败
  2：  新增失败
  3：  更新失败
*/
async function addBookToCourt(userId, bookId) {
  let res = {
    status: 1,
    message: 'FAILURE',
    code: 1
  }
  try {
    let book = await findBookDao(userId, bookId)
    if (book.length > 0) {
      try {
        await updateBookDao(userId, bookId)
        res = {
          status: 0,
          message: 'SUCCESS'
        }
      } catch (e) {
        res = {
          status: 1,
          message: 'FAILURE',
          code: 3
        }
        console.error(e)
      }
    } else {
      try {
        await addBookToCourtDao(userId, bookId)
        res = {
          status: 0,
          message: 'SUCCESS'
        }
      } catch (e) {
        res = {
          status: 1,
          message: 'FAILURE',
          code: 2
        }
        console.error(e)
      }
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = addBookToCourt