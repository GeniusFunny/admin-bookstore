const registerDao = require('../../dao/user').regiterDao
const insertUserInfoService = require('../userInfo/InsertUserInfoService')

async function registerService(phone, password) {
  let data
  try {
    data = await registerDao(phone, password)
    console.log(data)
    await insertUserInfoService(phone, `用户${data.data.userId}`, data.data.userId)
  }catch (e) {
    console.error(e.message)
    data = {
      status: 1,
      message: 'Service错误'
    }
  }
  return data
}
module.exports = registerService