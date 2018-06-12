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
  `
}

async function updateUserInfoDao (username, userId) {
  let source = [username, userId]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await query(sql.update, source)
    data = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return data
}

async function getUserInfo (userId) {
  let source = [userId]
  let data = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let res = await query(sql.get, source)
    data = {
      status: 0,
      message: 'SUCCESS',
      data: res[0]
    }
  } catch (e) {
    console.error(e)
  }
  return data
}

exports.updateUserInfoDao = updateUserInfoDao
exports.getUserInfoDao = getUserInfo