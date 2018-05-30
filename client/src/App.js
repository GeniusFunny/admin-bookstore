import React from 'react'
import ButtonAppBar from './components/ButtonAppBar'
import {Test, Register} from './api/Api'
async function test() {
  const res = await Test()
  console.log(res)
}
async function register() {
  const res = await Register({username: 'genius', password: '19980812'})
  console.log(res)
}

const  App = () => {
  return  <ButtonAppBar/>
}

export default App;