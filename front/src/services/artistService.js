import axios from 'axios'
import { URL } from './accountService'

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

export {
  becomeArtist,
  getArtist,
}