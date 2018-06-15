const query = require('../utils/query')

const sql = {
  getUserList: `
    SELECT *
    FROM user_info
  `,
  getBookList: `
    SELECT *
    FROM book
  `,
  getBillList: `
    SELECT *
    FROM bill
  `
}

const getUserList = async () => {
  return await query(sql.getUserList, [])
}

const getBookList = async () => {
  return await query(sql.getBookList, [])
}

const getBillList = async () => {
  return await query(sql.getBillList, [])
}
exports.getUserListDao = getUserList
exports.getBookListDao = getBookList
exports.getBillListDao = getBillList