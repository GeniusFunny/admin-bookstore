const getBookListDao = require('../../dao/management').getBookListDao

const getBookListService = async () => {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getBookListDao()
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

module.exports = getBookListService