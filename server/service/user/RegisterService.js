const registerDao = require('../../dao/user').regiterDao
const insertUserInfoService = require('../userInfo/InsertUserInfoService')
/*
  @code
  1：  注册失败
  2：  添加个人信息失败
 */
async function registerService(phone, password) {
  let res = {
    status: 1,
    message: 'FAILURE',
    code: 1
  }
  try {
    let data = await registerDao(phone, password)
    try {
      await insertUserInfoService(phone, `用户${data.insertId}`, data.insertId)
      res = {
        status: 0,
        message: 'SUCCESS'
      }
    } catch (e) {
      res = {
        status: 1,
        message: 'FAILURE',
        code: 2
      }
    }
  } catch (e) {
    console.error(e)
  }
  return res
}
module.exports = registerService