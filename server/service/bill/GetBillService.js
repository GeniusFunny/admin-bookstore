const getBillDao = require('../../dao/bill').getBillDao

async function getBillService (userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getBillDao(userId)
    res = {
      status: 0,
      message: 'SUCCESS',
      data: data
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = getBillService