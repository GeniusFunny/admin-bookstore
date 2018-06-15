const addBillDao = require('../../dao/bill').addBillDao

async function addBillService (userId, money) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await addBillDao(userId, money)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = addBillService