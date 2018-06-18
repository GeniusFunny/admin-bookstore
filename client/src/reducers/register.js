import {REQUEST_FAILURE, REGISTER_SUCCESS} from '../constants/actionType'

const register = (state = {
  hasRegistered: false
}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {hasRegistered: true})
    case REQUEST_FAILURE:
      return Object.assign({}, state, {hasRegistered: false})
    default:
      return state
  }
}

export default register