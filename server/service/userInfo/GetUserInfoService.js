const getUserInfoDao = require('../../dao/userInfo').getUserInfoDao
async function getUserInfoService (userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getUserInfoDao(userId)
    res = {
      status: 0,
      message: 'SUCCESS',
      data: data[0]
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = getUserInfoService