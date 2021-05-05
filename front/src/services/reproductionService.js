import axios from 'axios'
import { Observable } from 'rxjs'
import { URL } from './accountService'

const NURL = `${URL}/reproduction`

class Track {
  constructor(id) {
    this.id = id
  }
}

let actualTrack = new Track('')

const createReproduction = async (id) => {
  axios.post(`${NURL}/${id}`).catch((error) => {
    console.log(error)
    return error
  })
}

const accountReproductions = async () => {
  let data = null
  await axios.get(`${NURL}/accountReproductions`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const getTrack = () => actualTrack.id

const setTrack = (id) => {
  if (id !== getTrack()) {
    if ((JSON.parse(localStorage.getItem('user'))?.subscription)) {
      actualTrack = new Track(id)
      createReproduction(id)
    } else {
      accountReproductions().then((res) => {
        if (res[0].count < 3) {
          actualTrack = new Track(id)
          createReproduction(id)
        } else {
          // TODO: Modal para mostrar mensajes
          // eslint-disable-next-line no-alert
          alert('You reached the limit of free reproductions')
        }
      })
    }
  }
}

const actualTrackObservable = new Observable((subscriber) => {
  setInterval(() => {
    subscriber.next(getTrack())
  }, 100)
})

export {
  getTrack,
  setTrack,
  actualTrackObservable,
}
