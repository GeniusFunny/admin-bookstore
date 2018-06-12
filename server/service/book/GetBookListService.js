const getBookListDao = require('../../dao/book').getBookListDao

async function getBookListService() {
  return await getBookListDao()
}

module.exports = getBookListService