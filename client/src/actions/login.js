import login from "../reducers/login";

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_IN = 'LOGIN_IN'
const LOGIN_OUT = 'LOGIN_OUT'

export function loginIn (loginInfo) {
  return {
    type: LOGIN_IN,
    username: loginInfo.username,
    password: loginInfo.password
  }
}

export function loginOut () {
  return {
    type: LOGIN_OUT
  }
}

export function loginSuccess () {
  return {
    type: LOGIN_SUCCESS
  }
}

export function loginFailed () {
  return {
    type: LOGIN_FAILURE
  }
}