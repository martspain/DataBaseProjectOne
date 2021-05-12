import { URL, headers } from "./accountService";

const NURL = URL + '/search'

const search = async (toFind) => {
    const response = await fetch(NURL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ toFind }),
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    search,
}