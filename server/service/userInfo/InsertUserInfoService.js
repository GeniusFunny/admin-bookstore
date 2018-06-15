const insertUserInfoDao = require('../../dao/userInfo').insertUserInfoDao
async function insertUserInfoService (phone, username, userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await insertUserInfoDao(phone, username, userId)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = insertUserInfoService