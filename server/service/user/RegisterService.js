const registerDao = require('../../dao/user').regiterDao

async function registerService(phone, password) {
  let data
  try {
    data = await registerDao(phone, password)
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