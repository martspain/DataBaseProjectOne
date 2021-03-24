import { Observable } from "rxjs"
import { URL, headers } from "./accountService"

class Track {
    constructor(id) {
        this.id = id
    }
}

let actualTrack = new Track('')

const createReproduction = async (id) => {
    const response = await fetch(URL + '/reproduction/' + id, {
        method: 'POST',
        headers
    }).catch(error => console.log(error))
}

const getTrack = () => {
    return actualTrack.id
}

const setTrack = (id) => {
    if (id !== getTrack()) {
        actualTrack = new Track(id)
        createReproduction(id)
    }
}

const actualTrackObs = new Observable(subscriber => {
    setInterval(() => {
        subscriber.next(getTrack())
    }, 500);
})

export {
    getTrack,
    setTrack,
    actualTrackObs,
}