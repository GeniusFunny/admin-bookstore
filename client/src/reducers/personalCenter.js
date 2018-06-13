import {GET_BILL, GET_USER_INFO} from '../constants/actionType'

const personalCenter = (state = {
  info: {
    username: '测试',
    phone: 12345678901,
    userId: 1
  },
  billList: []
}, action) => {
  switch (action.type) {
    case GET_BILL:
      return Object.assign({}, state, {billList: action.billList})
    case GET_USER_INFO:
      return Object.assign({}, state, {info: action.info})
    default:
      return state
  }
}

export default personalCenter