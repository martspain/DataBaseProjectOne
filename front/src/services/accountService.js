import axios from 'axios'

const URL = 'http://localhost:3000'

const token = {
  token: null,
}

axios.interceptors.request.use(
  (config) => {
    const newConf = config
    if (token.token) {
      newConf.headers.Authorization = `Bearer ${token.token}`
    }
    return newConf
  },
  (error) => Promise.reject(error),
)

const login = async (account) => {
  let data = null
  await axios.post(`${URL}/login`, { account }).then((res) => {
    token.token = res.data.token
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('refreshToken', res.data.refreshToken)
    data = {}
  }).catch((error) => {
    console.log(error.response)
    if (error.response) data = error.response.data
    else data = { message: error.message }
  })
  return data
}

const signup = async (account) => {
  let data = null
  await axios.post(`${URL}/signup`, { account }).then((res) => {
    data = res.data
  }).catch((error) => {
    if (error.response) data = error.response.data
    else data = { message: error.message }
  })
  return data
}

const refreshToken = async () => {
  let result = false
  await axios.post(`${URL}/refreshToken`, { refreshToken: localStorage.getItem('refreshToken') }).then((res) => {
    token.token = res.data.token
    result = true
  }).catch((error) => {
    if (error) result = false
  })
  return result
}

const logout = () => {
  token.token = null
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

export {
  URL,
  login,
  signup,
  refreshToken,
  logout,
}
