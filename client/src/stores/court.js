import {createStore} from 'redux'
import court from '../reducers/court'

const store = createStore(court, {
  data: [],
  totalMoney: 0,
  totalCount: 0
})
export default store