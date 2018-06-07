const deleteBookDao = require('../../dao/court').deleteBookDao

async function deleteBookService(userid, bookid) {
  let data = await deleteBookDao()
  return data
}
module.exports = deleteBookService