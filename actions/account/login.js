import request from '../../utils/request'
import {
  message
} from 'antd'
import {
  delUser
} from '../../utils/storage'

export const signOut = async e => {
  // console.log(e)
  e.preventDefault()
  // 退出逻辑
  let res = await request.get('/nc/common/account/logout')
  // console.log(res)
  if (res.status === 0) {
    // 登出成功 node服务器已经把session里的用户信息删除 前端删除sessionStorage 跳转到登录页
    message.success('登出成功', 1, () => {
      delUser()
      window.location = '/account'
    })
  } else {
    message.error('登出失败')
  }
}