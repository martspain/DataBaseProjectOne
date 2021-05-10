import axios from 'axios'
import { URL } from './accountService'

const NURL = `${URL}/search`

const search = async (toFind) => {
  let data = null
  await axios.post(NURL, { toFind }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const searchArtist = async (toFind) => {
  let data = null
  await axios.post(`${NURL}/artists`, { toFind }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  search,
  searchArtist,
}
