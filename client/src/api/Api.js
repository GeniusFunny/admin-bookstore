import ajax from './ajax'
const Test = () => {
  return ajax('test', 'get')
}

export {
  Test
}