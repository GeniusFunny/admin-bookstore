const purchaseDao = require('../../dao/court').purchaseDao

async function purchaseService(userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await purchaseDao(userId)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = purchaseService