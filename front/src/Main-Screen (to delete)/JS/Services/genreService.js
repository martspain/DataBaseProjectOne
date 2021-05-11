import { URL, headers } from "./accountService";

const NURL = URL + '/genres'

const getGenre = async (id) => {
    const response = await fetch(NURL + '/' + id, {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    getGenre,
}