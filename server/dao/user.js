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
  return await query(sql.login, [phone, password])
}

async function registerDao (phone, password) {
  return await query(sql.register, [phone, password])
}

async function editDao (newPassword, userId) {
  return await query(sql.edit, [newPassword, userId])
}

exports.loginDao = loginDao
exports.regiterDao = registerDao
exports.editDao = editDao