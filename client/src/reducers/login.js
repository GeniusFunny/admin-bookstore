const login = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_IN':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        hasLoginIn: true
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false
      }
    case 'LOGIN_OUT':
      return {
        ...state,
        hasLoginIn: false
      }
    default: {
      return state
    }
  }
}

export default login