const purchaseDao = require('../../dao/court').purchaseDao

async function purchaseServiece(userid) {
  let data = await purchaseDao(userid)
  return data
}

module.exports = purchaseServiece