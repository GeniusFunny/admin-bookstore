const loginDao = require('../../dao/user').loginDao

async function loginService (phone, password) {
  let data
  try {
    data = await loginDao(phone, password)
  } catch (e) {
    console.log(e.code)
    data = {
      status: 1,
      message: 'Service错误'
    }
  }
  return data
}

module.exports = loginService