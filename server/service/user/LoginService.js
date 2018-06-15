const loginDao = require('../../dao/user').loginDao

/*
  @code
  1:  判断失败
  2:  用户不存在
  3： 用户密码错误
 */
async function loginService (phone, password) {
  let res = {
    status: 1,
    message: 'FAILURE',
    code: 1
  }
  try {
    let user = await loginDao(phone, password)
    if (user.length === 0) {
      res = {
        status: 1,
        message: 'FAILURE',
        code: 2
      }
    } else {
      if (password === user[0].password) {
        res = {
          status: 0,
          message: 'SUCCESS'
        }
      }
      else {
        res = {
          status: 1,
          message: 'FAILURE',
          code: 3
        }
      }
    }
  } catch (e) {
    console.error(e)
  }

  return res
}

module.exports = loginService