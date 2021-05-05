import axios from 'axios'

const URL = 'http://localhost:3000'

axios.interceptors.request.use(
  (config) => {
    const accessToken = accessTokenfromres
    if (accessToken) {
      config.headers.auth = `bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
