function makeActionCreator (type, ...data) {
  return function (...arg) {
    let action = {type}
    data.forEach((item, index) => {
      action[data[index]] = arg[index]
    })
    return action
  }
}

export default makeActionCreator