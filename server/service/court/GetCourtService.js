const getCourtDao = require('../../dao/court').getCourtDao

async function getCourtService(userid) {
  let data = getCourtDao(userid)
  return data
}

module.exports = getCourtService