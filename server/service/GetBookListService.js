const getBookListDao = require('../dao/book').getBookListDao

async function getBookListService() {
  let data = await getBookListDao()
  return data
}

module.exports = getBookListService