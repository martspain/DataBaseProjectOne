import { URL } from "./accountService";

const NURL = URL + '/playlists'
const headers = {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token')) && { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
    ...(localStorage.getItem('subscription')) && { 'Subscription': `${localStorage.getItem('subscription')}`} 
}

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