const testDao = require('../dao/index').testDao

async function testService(userId) {
  let data = await testDao(userId)
  return data
}

module.exports = testService