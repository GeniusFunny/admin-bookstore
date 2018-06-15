const getBookListDao = require('../../dao/book').getBookListDao

async function getBookListService() {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getBookListDao()
    res = {
      status: 1,
      message: 'SUCCESS',
      data: data
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = getBookListService