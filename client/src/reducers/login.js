import {LOGIN_OUT, LOGIN_SUCCESS} from '../constants/actionType'

const login = (state = {
  isAuth: false,
  data: {
    role: 0,
    userId: 0
  }
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {data: action.data, isAuth: true})
    case LOGIN_OUT:
      return Object.assign({}, state, {isAuth: false, username: '尚未登录'})
    default:
      return state
  }
}

export default login