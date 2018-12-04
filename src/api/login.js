import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    Account:username,
    Password:password
  }
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

