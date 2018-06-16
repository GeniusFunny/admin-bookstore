const baseUrl = 'http://localhost:5000'
const DEBUG = false
/*
  config_queryString
  @配置查询字符串
  {
    name: genius,    =>     '?name=genius&age=17'
    age: 17
  }
*/
const config_queryString = (data) => {
  if (typeof data === 'undefined') {
    return ''
  }
  let str = '?'
  Object.keys(data).forEach(key => {
    str += `${key}=${data[key]}&`
  })
  return str.slice(0, -1)
}
/*
  config_restful
  @配置restful
  {
    id1: 1,     =>    '/1/2'
    id2: 2
  }
*/
const config_restful = (data) => {
  let str = ''
  Object.values(data).forEach(id => {
    str += `/${id}`
  })
  return str
}
/* 匹配特殊的请求配置，如GET_RESTFUL  */
const config_methods = {
  GET: (url, data) => {
    return {
      method: 'GET',
      url: `${baseUrl}/${url}${config_queryString(data)}`
    }
  },
  GET_RESTFUL: (url, data) => {
    return {
      method: 'GET',
      url: `${baseUrl}/${url}${config_restful(data)}`
    }
  },
  DELETE_RESTFUL: (url, data) => {
    return {
      method: 'DELETE',
      url: `${baseUrl}/${url}${config_restful(data)}`
    }
  }
}
/*  默认的请求配置 */
const normalMethods = (method, url, data) => {
  return {
    method: method,
    url: `${baseUrl}/${url}`,
    data: data
  }
}
/* 包装请求配置 */
const config_request = (url, method, data, headers = {'Content-Type': 'application/json'}) => {
  if (typeof config_methods[method.toUpperCase()] === 'undefined') {
    let config = normalMethods(method.toUpperCase(), url, data)
    return {
      ...config,
      headers
    }
  } else {
    let config = config_methods[method.toUpperCase()](url, data)
    config['headers'] = headers
    return config
  }
}
/*  XHR实现 */
const makeRequest = (config) => {
  //  Mock服务
  // if (DEBUG) {
  //   let res = 'test'
  //   return new Promise((resolve, reject) => {
  //     resolve(res)
  //   })
  // }
  return new Promise((resolve, reject) => {
    let xhr
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      try {
        xhr = new window.ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        try {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {
          console.error(`${e}, 不支持异步网络接口`)
        }
      }
    }
    if (xhr) {
      xhr.open(config.method, config.url)
      xhr.withCredentials = true
      xhr.onload = () => {
        if (xhr.status >= 200 || xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.response))
          } catch (e) {
            resolve(xhr.response)
          }
        } else if (xhr.status === 401) {
          console.log('登录失效，请重新登录')

        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          })
        }
      }
      xhr.onerror = () => {
        reject({
          message: '网络错误'
        })
      }
      if (config.headers) {
        Object.keys(config.headers).forEach(key => {
          xhr.setRequestHeader(key, config.headers[key])
        })
      }
      if (config.data) {
        xhr.send(JSON.stringify(config.data))
      } else {
        xhr.send()
      }
    }
  })
}
/*  接口  */
const ajax = (url, method = 'GET', data = {}) => {
  return makeRequest(config_request(url, method, data))
}

export default ajax