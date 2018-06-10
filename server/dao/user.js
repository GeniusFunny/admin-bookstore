const query = require('../utils/query')

const sql = {
  login: `
    SELECT password, role, userId
    FROM user
    WHERE phone=?
  `,
  register: `
    INSERT INTO user(phone, password, role)
      VALUES(?, ?, 1)
  `,
  edit: `
    UPDATE user SET password=?
    WHERE userId=?
  `
}

async function loginDao (phone, password) {
  let source = [phone]
  let data
  let res = await query(sql.login, source)
  if (res.length === 0) {
    data = {
      status: 1,
      message: '用户不存在'
    }
  } else if (res[0].password === password) {
    data = {
      status: 0,
      message: 'SUCCESS',
      data: {
        role: res[0].role,
        userId: res[0].userId
      }
    }
  } else {
    data = {
      status: 1,
      message: '密码错误'
    }
  }
  return data
}

async function registerDao (phone, password) {
  let source = [phone, password]
  let data
  try {
    let res = await query(sql.register, source)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: {
        userId: res.insertId
      }
    }
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      data = {
        status: 1,
        message: '手机号被占用'
      }
    }
  }
  return data
}

async function editDao (newPassword, userId) {
  let source = [newPassword, userId]
  return await query(sql.edit, source)
}

exports.loginDao = loginDao
exports.regiterDao = registerDao
exports.editDao = editDao