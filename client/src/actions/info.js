import {GET_USER_INFO} from '../constants/actionType'
import {GetUserInfo} from '../api/Api'
import {requestFailure, receiveResponseStatus} from './common'
import makeActionCreator from './actionCreator'

const getUserInfo = makeActionCreator(GET_USER_INFO, 'info')

const asyncGetUserInfo = () => dispatch => {
  GetUserInfo()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getUserInfo(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

export {
  asyncGetUserInfo
}

