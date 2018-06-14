import React from 'react'
import {Provider} from 'react-redux'
import store from './stores/index'
import Index from './containers/Nav'
console.log(store.getState())
const App = () => {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  )
}

export default App;