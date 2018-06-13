import React from 'react'
import {Provider} from 'react-redux'
import store from './stores/personalCenter'
import Index from './containers/Nav'
const App = () => {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  )
}

export default App;