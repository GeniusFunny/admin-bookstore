const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

export function fetchRequest () {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

export function fetchSuccess (json) {
  return {
    type: FETCH_POSTS_SUCCESS,
    data: json
  }
}

export function fetchFailure () {
  return {
    type: FETCH_POSTS_FAILURE
  }
}