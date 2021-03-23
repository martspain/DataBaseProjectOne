const URL = 'http://localhost:3000'

const login = async (login) => {
    const response = await fetch(URL + '/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login })
    })
    try {
        const data = await response.json()
        console.log(data)
        //return data
    } catch (error) {
        console.log(error)
    }
}

export {
    login,
}