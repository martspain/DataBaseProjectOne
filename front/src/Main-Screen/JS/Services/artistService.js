import { URL, headers, login } from "./accountService"

const NURL = URL + '/artists'

const becomeArtist = async (artist) => {
    const response = await fetch(NURL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ artist })
    })
    try {
        const data = await response.json()
        return ({data, status:response.status})
    } catch (error) {
        console.log(error)
    }
}

const getArtist = async (id) => {
    const response = await fetch(NURL + '/' + id, {
        headers,
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    becomeArtist,
    getArtist,
}