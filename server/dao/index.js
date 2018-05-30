const query = require('../utils/query')

async function registerDao (username, password) {
  let source = []
  source.push(username)
  source.push(password)
  let sql = `
    INSERT INTO user(username, password)
      VALUES (?, ?)
  `
  let data = await query(sql, source)
  return data
}

async function testDao (userId) {
  let sql = `
    SELECT username, age
    FROM userInfo
    Where userid=?
  `
  let data = await query(sql, userId)
  return data
}
exports.registerDao = registerDao
exports.testDao = testDao