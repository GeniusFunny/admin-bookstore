import {
  ADD_BOOK_TO_COURT,
  GET_BOOK_MARKET,
  SEARCH_BOOK,
  REQUEST_FAILURE,
  ADD_BOOK_TO_COURT_SUCCESS,
  ADD_BOOK_TO_COURT_FAILURE,
  UPDATE_KEYWORD,
  GET_BOOK_SEARCH_RES,
  CLOSE_MESSAGE
} from '../constants/actionType'

const asyncBook = (state = {
  data: [],
  loading: true,
  keyWord: '',
  message: {
    message: '加载成功',
    type: 'success',
    open: false
  }
}, action) => {
  switch (action.type) {
    case ADD_BOOK_TO_COURT_FAILURE:
    case ADD_BOOK_TO_COURT_SUCCESS:
      return Object.assign({}, state, {message: action.message})
    case UPDATE_KEYWORD:
      return Object.assign({}, state, {keyWord: action.keyWord})
    case SEARCH_BOOK:
      return Object.assign({}, state, {keyWord: action.keyWord})
    case CLOSE_MESSAGE:
      return Object.assign({}, state, {message: {
          ...state.message,
          open: false
        }})
    case GET_BOOK_SEARCH_RES:
    case GET_BOOK_MARKET:
      return Object.assign({}, state, {data: action.data, loading: false})
    case ADD_BOOK_TO_COURT:
      return Object.assign({}, state, {})
    case REQUEST_FAILURE:
      return Object.assign({}, state, {loading: false, error: action.err})
    default:
      return state
  }
}
export default asyncBook