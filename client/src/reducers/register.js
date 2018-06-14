import {REQUEST_FAILURE, REGISTER_SUCCESS} from '../constants/actionType'

const register = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state)
    case REQUEST_FAILURE:
      return Object.assign({}, state)
    default:
      return state
  }
}

export default register