import { Observable } from "rxjs"

class Track {
    constructor(id) {
        this.id = id
    }
}

let actualTrack = new Track('')

const getTrack = () => {
    return actualTrack.id
}

const setTrack = (id) => {
    actualTrack = new Track(id)
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