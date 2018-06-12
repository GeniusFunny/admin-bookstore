const getBillDao = require('../../dao/bill').getBillDao

async function getBillService (userId) {
  return await getBillDao(userId)
}

module.exports = getBillService