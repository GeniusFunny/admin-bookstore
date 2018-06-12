const query = require('../utils/query')

const sql = {
  get: `
    SELECT * FROM bill
    WHERE userId=?
  `,
  add: `
    INSERT INTO bill 
      VALUES(?, ?)
  `
}

async function getBillDao (useId) {
  let source = [useId]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let res = await query(sql.get, source)
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

async function addBillDao (userId, money) {
  let source = [userId, money]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await query(sql.add, source)
    data = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return data
}

exports.addBillDao = addBillDao
exports.getBillDao = getBillDao