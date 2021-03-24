import { URL, headers } from "./accountService";

const NURL = URL + '/albums'

const getAllAlbums = async () => {
    const response = await fetch(NURL, {
        headers,
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getAlbum = async (id) => {
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
    getAllAlbums,
    getAlbum,
}