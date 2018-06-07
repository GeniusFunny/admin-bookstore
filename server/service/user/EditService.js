const editDao = require('../../dao/user').editDao

async function EditService (newPassword, userID) {
  return await editDao(newPassword, userID)
}

module.exports = EditService