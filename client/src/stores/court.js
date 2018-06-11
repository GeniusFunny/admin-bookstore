import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import court from '../reducers/court'
const loggerMiddleware = createLogger()

const store = createStore(
  court,
  {
    data: [],
    totalMoney: 0,
    totalCount: 0
  },
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)
export default store