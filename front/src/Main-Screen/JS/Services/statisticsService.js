import { URL, headers } from "./accountService"

const NURL = URL + '/statistics'

const recentAlbums = async () => {
    const response = await fetch(NURL + '/recentAlbums',{
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const popularArtists = async () => {
    const response = await fetch(NURL + '/popularArtists', {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const subscriptionCount = async () => {
    const response = await fetch(NURL + '/subscriptionCount', {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const largestProductionArtists = async () => {
    const response = await fetch(NURL + '/largestProductionArtists', {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const popularGenres = async () => {
    const response = await fetch(NURL + '/popularGenres', {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const mostActiveAccounts = async () => {
    const response = await fetch(NURL + '/mostActiveAccounts', {
        headers,
    })
    try {
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

export {
    recentAlbums,
    popularArtists,
    subscriptionCount,
    largestProductionArtists,
    popularGenres,
    mostActiveAccounts,
}