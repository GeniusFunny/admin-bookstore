const addBillDao = require('../../dao/bill').addBillDao

async function addBillService (money, userId) {
  return await addBillDao(money, userId)
}

module.exports = addBillService