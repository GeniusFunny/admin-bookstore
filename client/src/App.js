import React from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import {Test} from './api/Api'
async function test() {
  const res = await Test()
  console.log(res)
}
test()
const  App = () => {
  return  <ButtonAppBar/>
}

export default App;