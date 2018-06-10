const editDao = require('../../dao/user').editDao

async function EditService (newPassword, userId) {
  return await editDao(newPassword, userId)
}

module.exports = EditService