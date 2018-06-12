const getUserInfoDao = require('../../dao/userInfo').getUserInfoDao
async function getUserInfoService (userId) {
  return await getUserInfoDao(userId)
}
module.exports = getUserInfoService