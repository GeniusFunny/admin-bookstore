const getUserListDao = require('../../dao/management').getUserListDao

const getUserListService = async () => {
  let res = {
    status: 1,
    message: 'FAILURE'
  }
  try {
    let data = await getUserListDao()
    res = {
      status: 0,
      message: 'SUCCESS',
      data: data
    }
  } catch (err) {
    console.error(err)
  }
  return res
}

module.exports = getUserListService