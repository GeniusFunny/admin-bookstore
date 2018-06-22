import {RECEIVE_STATUS, REQUEST_FAILURE} from "../constants/actionType"
import makeActionCreator from './actionCreator'
const receiveResponseStatus = makeActionCreator(RECEIVE_STATUS, 'status')
const requestFailure = makeActionCreator(REQUEST_FAILURE, 'err')

export {
  receiveResponseStatus,
  requestFailure
}