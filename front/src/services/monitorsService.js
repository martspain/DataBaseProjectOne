import axios from 'axios'
import { URL } from './accountService'

const NURL = `${URL}/monitors`

const noMonitors = async () => {
  let data = null
  await axios.get(`${NURL}/noMonitors`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const createMonitor = async (monitor) => {
  let data = null
  await axios.post(NURL, { monitor }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = error.response.data
  })
  return data
}

export {
  noMonitors,
  createMonitor,
}
