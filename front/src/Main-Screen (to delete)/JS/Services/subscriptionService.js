import { URL, headers, login } from "./accountService"

const becomePremium = async (password) => {
    const response = await fetch(URL + '/subscribe', {
        method: 'POST',
        headers,
    })
    try {
        const data = await response.json()
        return ({data, status:response.status})
    } catch (error) {
        console.log(error)
    }
}

const becomeManager = async (password) => {
    const response = await fetch(URL + '/manager', {
        method: 'POST',
        headers,
    })
    try {
        const data = await response.json()
        return ({data, status:response.status})
    } catch (error) {
        console.log(error)
    }
}

export {
    becomePremium,
    becomeManager,
}