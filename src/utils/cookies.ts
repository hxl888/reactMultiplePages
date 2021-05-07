import Cookies from 'js-cookie'

const TokenKey = 'token'
// const nickName = 'nickname'

export const getToken = () => {
  return Cookies.get()
}

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

export const getNickname = (nickName: string) => {
  return Cookies.get(nickName)
}

export const setNickname = (nickName: string, name: string) => {
  return Cookies.set(nickName, name)
}

export const removeNickname = (nickName: string) => {
  return Cookies.remove(nickName)
}
