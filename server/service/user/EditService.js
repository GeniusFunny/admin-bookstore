const editDao = require('../../dao/user').editDao

async function EditService (newPassword, userId) {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    await editDao(newPassword, userId)
    res = {
      status: 0,
      message: 'SUCCESS'
    }
  } catch (e) {
    console.error(e)
  }
  return res
}

module.exports = EditService