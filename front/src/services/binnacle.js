import axios from 'axios'
import { URL } from './accountService'

const NURL = `${URL}/binnacle`

const getBinnacle = async () => {
  let data = null
  await axios.get(NURL).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getBinnacle,
}
