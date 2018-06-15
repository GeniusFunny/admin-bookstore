const getBillListDao = require('../../dao/management').getBillListDao

const getBillListService = async () => {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getBillListDao()
    res = {
      status: 0,
      message: 'SUCCESS',
      data: data
    }
  } catch (err) {
    console.error(err)
  }
  return res
}

module.exports = getBillListService