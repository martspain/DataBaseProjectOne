import axios from 'axios'
import URL from './url'

const NURL = `${URL}/songs`

const getAllSongs = async () => {
  let data = null
  await axios.get(NURL).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const updateSong = async (song) => {
  let data = null
  await axios.put(NURL, { song }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  getAllSongs,
  updateSong,
}
