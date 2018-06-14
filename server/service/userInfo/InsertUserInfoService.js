const insertUserInfoDao = require('../../dao/userInfo').insertUserInfoDao
async function insertUserInfoService (phone, username, userId) {
  return await insertUserInfoDao(phone, username, userId)
}
module.exports = insertUserInfoService