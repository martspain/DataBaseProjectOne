import axios from 'axios'
import URL from './url'

const NURL = `${URL}/migrate`

const getLastUpdate = async () => {
  let data = null
  await axios.get(`${NURL}/lastUpdate`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.response.data.message }
  })
  return data
}

const migrateRepsPerDate = (date) => axios.post(`${NURL}/repsPerDate`, { date })

const recommendation = async (username) => {
  let data = null
  await axios.get(`${NURL}/recommend/${username}`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.response.data.message }
  })
  return data
}

export {
  getLastUpdate,
  migrateRepsPerDate,
  recommendation,
}
