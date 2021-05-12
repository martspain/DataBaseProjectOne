import axios from 'axios'
import URL from './url'

const NURL = `${URL}/genres`

const getGenre = async (id) => {
  let data = null
  await axios.get(`${NURL}/${id}`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export default getGenre
