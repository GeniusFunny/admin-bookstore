const getCourtDao = require('../../dao/court').getCourtDao

async function getCourtService(userid) {
  return await getCourtDao(userid)
}

module.exports = getCourtService