import { URL, headers } from "./accountService";

const NURL = URL + '/playlists'

const getPlaylists = async () =>{
    const response = await fetch(NURL + '/' + JSON.parse(localStorage.getItem('user')).account.username, {
        headers})
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export{
    getPlaylists,
}