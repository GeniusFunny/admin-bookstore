import {REGISTER_SUCCESS, REQUEST_FAILURE} from '../constants/actionType'
import {receiveResponseStatus, requestFailure}  from './common'
import {asyncLoginIn} from './login'
import {Register} from '../api/Api'

const registerSuccess = () => ({
  type: REGISTER_SUCCESS
})
const registerFailure = () => ({
  type: REQUEST_FAILURE
})
const asyncRegister = (data) => dispatch => {
  Register(data)
    .then(res => {
      dispatch(registerSuccess(res.data.userId))
      dispatch(receiveResponseStatus(res.status))
      dispatch(asyncLoginIn({username: data.phone, password: data.password}))
    })
    .catch(err => {
      dispatch(registerFailure())
      dispatch(requestFailure(err))
    })
}

export {
  asyncRegister
}