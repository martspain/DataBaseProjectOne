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
        headers,
    }).catch(error => console.log(error))
}

const accountReproductions = async () => {
    const response = await fetch(URL + '/reproduction/accountReproductions', {
        headers,
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getTrack = () => {
    return actualTrack.id
}

const setTrack = (id) => {
    if (id !== getTrack()) {
        if ((JSON.parse(localStorage.getItem('user')).subscription)) {
            actualTrack = new Track(id)
            createReproduction(id)
        } else {
            accountReproductions().then(res => {
                if (res[0].count < 3) {
                    actualTrack = new Track(id)
                    createReproduction(id)
                } else {
                    alert('You reached the limit of free reproductions')
                }
            })
        }
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