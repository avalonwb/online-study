// 操作sessionStorage的方法

const key = 'USER_INFO'

// 查
export const getUser = () => {
  return JSON.parse(sessionStorage.getItem(key) || '{}')
}

// 增
export const saveUser = user => {
  sessionStorage.setItem(key, JSON.stringify(user || {}))
}

// 删
export const delUser = () => {
  sessionStorage.removeItem(key)
}