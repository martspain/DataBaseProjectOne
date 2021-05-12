import axios from 'axios'
import URL from './url'

const NURL = `${URL}/albums`

const getAllAlbums = async () => {
  let data = null
  await await axios.get(NURL).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const getAlbum = async (id) => {
  let data = null
  await axios.get(`${NURL}/${id}`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const updateAlbum = async (album) => {
  let data = null
  await axios.put(NURL, { album }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  getAllAlbums,
  getAlbum,
  updateAlbum,
}
