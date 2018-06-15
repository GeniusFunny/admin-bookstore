const updateUserInfoDao = require('../../dao/userInfo').updateUserInfoDao
async function updateUserInfoService (username, userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await updateUserInfoDao(username, userId)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = updateUserInfoService