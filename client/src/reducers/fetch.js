const fetch = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return {
        ...state
      }
      ,
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state
      },
    case 'FETCH_POSTS_FAILURE':
      return {
        ...state
      }
    default:
      return state
  }
}