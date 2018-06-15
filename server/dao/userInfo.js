const query = require('../utils/query')

const sql = {
  get: `
    SELECT *
    FROM user_info
    WHERE userId=?
  `,
  update: `
    UPDATE user_info SET username=?
    WHERE userId=?
  `,
  insert: `
    INSERT INTO user_info VALUES(?, ?, ?)
  `
}

async function updateUserInfoDao (username, userId) {
  return await query(sql.update, [username, userId])
}

async function getUserInfo (userId) {
  return await query(sql.get, [userId])
}
async function insertUserInfo (phone, username, userId) {
  return await query(sql.insert, [phone, username, userId])
}

exports.updateUserInfoDao = updateUserInfoDao
exports.insertUserInfoDao = insertUserInfo
exports.getUserInfoDao = getUserInfo