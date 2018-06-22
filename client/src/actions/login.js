import {LOGIN_IN, LOGIN_FAILURE, LOGIN_OUT, LOGIN_SUCCESS} from '../constants/actionType'
import {requestFailure, receiveResponseStatus} from '../actions/common'
import {Login} from '../api/Api'
import makeActionCreator from './actionCreator'

const login = makeActionCreator(LOGIN_IN)
const loginOut = makeActionCreator(LOGIN_OUT)
const loginFailure = makeActionCreator(LOGIN_FAILURE)
const loginFromLocalStorage = makeActionCreator(LOGIN_SUCCESS)
const receiveUserInfo = makeActionCreator(LOGIN_SUCCESS, 'data')

const asyncLoginOut = () => dispatch => {
  dispatch(loginOut())
}
const asyncLoginIn = (data) => dispatch => {
  dispatch(login())
  Login(data)
    .then(res => {
      if (res.status === 0) {
        dispatch(receiveResponseStatus(res.status))
        dispatch(receiveUserInfo(res.data))
      }
    })
    .catch(err => {
      dispatch(requestFailure(err))
      dispatch(loginFailure())
    })
}
export {
  asyncLoginIn,
  asyncLoginOut,
  loginFromLocalStorage
}