const getBookListDao = require('../dao/book').getBookListDao

console.log(getBookListDao)
async function getBookListService() {
  let data = await getBookListDao()
  return data
}

module.exports = getBookListService