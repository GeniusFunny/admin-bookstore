const purchaseDao = require('../../dao/court').purchaseDao

async function purchaseServiece(userId) {
  let data = await purchaseDao(userId)
  return data
}

module.exports = purchaseServiece