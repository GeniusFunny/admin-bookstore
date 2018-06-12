import React from 'react'
import {Provider} from 'react-redux'
import store from './stores/court'
// import Index from './containers/Nav'
import Court from './containers/Court'

store.subscribe(() => {
  console.log(store.getState())
})
const App = () => {
  return (
    <Provider store={store}>
      <Court/>
    </Provider>
  )
}

export default App;