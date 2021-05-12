import axios from 'axios'
import URL from './url'

const NURL = `${URL}/artists`

const becomeArtist = async (artist) => {
  let data = null
  await axios.post(NURL, { artist }).then((res) => {
    data = { data: res.data, status: res.status }
  }).catch((error) => {
    data = { message: error.message, status: error.response.status }
  })
  return data
}

const getArtist = async (id) => {
  let data = null
  await axios.get(`${NURL}/${id}`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const getArtistsAccounts = async () => {
  let data = null
  await axios.get(`${NURL}/accounts`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const deactivateArtist = async (artist) => {
  let data = null
  await axios.put(`${NURL}/deactivateArtist`, { artist }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  becomeArtist,
  getArtist,
  getArtistsAccounts,
  deactivateArtist,
}
