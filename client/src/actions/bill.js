import {GET_BILL} from "../constants/actionType"
import {receiveResponseStatus, requestFailure} from './common'
import {GetUserBill} from "../api/Api"

const getBill = (billList) => ({
  type: GET_BILL,
  billList
})

const asyncGetBill = () => dispatch => {
  GetUserBill()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getBill(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

export {
  asyncGetBill
}