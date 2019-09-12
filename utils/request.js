const baseUrl = 'http://157.122.54.189:9092'

function request(url, options) {
  return fetch(baseUrl + url, options)
}

request.get = (url) => {
  return fetch(baseUrl + url, {
    method: 'GET',
    cache: 'no-cache', // 不缓存请求
    credentials: 'include' // 允许跨域携带cookies
  }).then(res => {
    if (res.status === 200) {
      return res.json()
    } else {
      throw new Error('返回数据状态错误')
    }
  }).catch(err => {
    throw new Error('请求失败')
  })
}

request.post = (url, body) => {
  return fetch(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    cache: 'no-cache', // 不缓存请求
    credentials: 'include' // 允许跨域携带cookies
  }).then(res => {
    if (res.status === 200) {
      return res.json()
    } else {
      throw new Error('返回数据状态错误')
    }
  }).catch(err => {
    throw new Error('请求失败')
  })
}

export default request