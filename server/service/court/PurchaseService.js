const purchaseDao = require('../../dao/court').purchaseDao
const addBill = require('../bill/AddBillService')
async function purchaseService(userId, bookIds, money) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    bookIds.forEach(async item => {
      await purchaseDao(userId, item.bookId)
    })
    try {
      res = await addBill(userId, money)
    } catch (e) {
      console.error(e)
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = purchaseService