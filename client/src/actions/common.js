import {RECEIVE_STATUS, REQUEST_FAILURE} from "../constants/actionType"

const receiveResponseStatus = (status) => ({
  type: RECEIVE_STATUS,
  status
})
const requestFailure = (err) => ({
  type: REQUEST_FAILURE,
  err
})

export {
  receiveResponseStatus,
  requestFailure
}