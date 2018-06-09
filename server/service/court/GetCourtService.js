const getCourtDao = require('../../dao/court').getCourtDao
const getBookService = require('../book/GetBookService')

async function getCourtService(userid) {
  let res
  try {
    let courtList = await getCourtDao(userid)
    try {
      res = {
        status: 0,
        message: 'SUCCESS',
        data: []
      }
      for (let item of courtList.data) {
        let data = await getBookService(item.bookid)
        data.data.count = item.count
        res.data.push(data.data)
      }
    } catch (e) {
      console.error(e, '获取书籍信息失败')
      res = {
        status: 1,
        message: 'FAILURE'
      }
    }
  } catch (e) {
    res = {
      status: 1,
      message: 'FAILURE'
    }
    console.error(e, '获取购物车失败')
  }
  return res
}

module.exports = getCourtService