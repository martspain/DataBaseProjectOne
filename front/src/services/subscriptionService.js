import axios from 'axios'
import { URL } from './accountService'

const NURL = `${URL}/subscription`

const becomePremium = async () => {
  let data = null
  await axios.post(`${NURL}/subscribe`).then((res) => {
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

const getNonSubscribedAccounts = async () => {
  let data = null
  await axios.get(`${NURL}/nonSubscribedAccounts`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const getSubscribedAccounts = async () => {
  let data = null
  await axios.get(`${NURL}/subscribedAccounts`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const deactivateNonSubscribed = async (account) => {
  let data = null
  await axios.put(`${NURL}/deactivateNonSubscribed`, { account }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.response.data }
  })
  return data
}

const removeSubscription = async (account) => {
  let data = null
  await axios.put(`${NURL}/removeSubscription`, { account }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.response.data }
  })
  return data
}

export {
  becomePremium,
  becomeManager,
  getNonSubscribedAccounts,
  getSubscribedAccounts,
  deactivateNonSubscribed,
  removeSubscription,
}
