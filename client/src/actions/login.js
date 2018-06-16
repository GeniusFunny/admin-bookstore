import {LOGIN_IN, LOGIN_FAILURE, LOGIN_OUT, LOGIN_SUCCESS} from '../constants/actionType'
import {requestFailure, receiveResponseStatus} from '../actions/common'
import {Login} from '../api/Api'
const login = () => ({
  type: LOGIN_IN
})
const loginOut = () => ({
  type: LOGIN_OUT
})
const loginFailure = () => ({
  type: LOGIN_FAILURE
})
const asyncLoginOut = () => dispatch => {
  dispatch(loginOut())
}
const receiveUserInfo = (data) => ({
  type: LOGIN_SUCCESS,
  data
})
const asyncLoginIn = (data) => dispatch => {
  dispatch(login())
  Login(data)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(receiveUserInfo(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
      dispatch(loginFailure())
    })
}

export {
  asyncLoginIn,
  asyncLoginOut
}