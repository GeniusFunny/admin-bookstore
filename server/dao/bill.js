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
  return await query(sql.get, [useId])
}

async function addBillDao (userId, money) {
  return await query(sql.add, [userId, money])
}

exports.addBillDao = addBillDao
exports.getBillDao = getBillDao