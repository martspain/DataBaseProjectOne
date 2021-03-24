const URL = 'http://localhost:3000'

const headers = {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token')) && { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
}

const login = async (login) => {
    const response = await fetch(URL + '/login', {
        method: 'POST',
        headers,
        body: JSON.stringify({ login })
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const signup = async (account) => {
    const response = await fetch(URL + '/signup', {
        method: 'POST',
        headers,
        body: JSON.stringify({ account })
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    URL,
    headers,
    login,
    signup,
}