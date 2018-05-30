const registerDao = require('../dao/index').registerDao

async function registerService(username, password) {
  let data = await registerDao(username, password)
  console.log(data)
  return data
}
module.exports = registerService