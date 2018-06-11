const court = (state = {}, action) => {
  switch (action.type) {
    case 'GET_BOOK_LIST':
      return {
        ...state,
        data: action.data
      }
    case 'EDIT_BOOK_COUNT':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.bookId === action.id) {
            return {
              ...item,
              count: action.count
            }
          } else {
            return item
          }
        })
      }
    case 'DELETE_BOOK':
      return {
        ...state,
        data: state.data.filter(item => item.bookId !== action.id)
      }
    case 'SELECT_BOOK':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.bookId === action.id) {
            return {
              ...item,
              isSelected: true
            }
          } else {
            return item
          }
        })
      }
    case 'CANCEL_SELECT_BOOk':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.bookId === action.id) {
            return {
              ...item,
              isSelected: false
            }
          } else {
            return item
          }
        })
      }
    case 'PURCHASE':
      return {
        ...state,
        data: state.data.filter(item => !item.isSelected)
      }
    default:
      return state
  }
}

export default court