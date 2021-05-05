import axios from 'axios'
import { URL } from './accountService'

const becomePremium = async () => {
  let data = null
  await axios.post(`${URL}/subscribe`).then((res) => {
    data = { data: res.data, status: res.status }
  }).catch((error) => {
    data = { message: error.message, status: error.response.status }
  })
  return data
}

const becomeManager = async () => {
  let data = null
  await axios.post(`${URL}/manager`).then((res) => {
    data = { data: res.data, status: res.status }
  }).catch((error) => {
    data = { message: error.message, status: error.response.status }
  })
  return data
}

export {
  becomePremium,
  becomeManager,
}
