const updateUserInfoDao = require('../../dao/userInfo').updateUserInfoDao
async function updateUserInfoService (username, userId) {
  return await updateUserInfoDao(username, userId)
}
module.exports = updateUserInfoService