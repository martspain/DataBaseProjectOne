import React from "react"
import { useHistory, useParams } from "react-router"
import { login } from "../Services/accountService"
import { becomeArtist } from "../Services/artistService"
import { becomeManager, becomePremium } from "../Services/subscriptionService"

const BecomeX = () => {
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [artist, setArtist] = React.useState({
        id: '',
        artistic_name: '',
    })
    const { id } = useParams()
    const history = useHistory()

    const handlePassChange = (event) => {
        const value = event.target.value
        setPassword(value)
    }

    const handleInputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setArtist({
            ...artist,
            [name]: value
        })
    }

    const successLogin = () => {
        login({
            username: JSON.parse(localStorage.getItem('user')).account.username,
            password,
        }).then(res => {
            if (res.message) setMessage(res.message)
            else {
                setMessage('')
                if (id === 'premium') {
                    becomePremium().then(res => {
                        setMessage(`${res.data.message}`)
                        if (res.status === 201) {
                            login({
                                username: JSON.parse(localStorage.getItem('user')).account.username,
                                password,
                            }).then(res => {
                                history.push('/home/discover')
                            })
                        }
                    })
                }
                if (id === 'artist') {
                    becomeArtist(artist).then(res => {
                        setMessage(`${res.data.message}`)
                        if (res.status === 201) {
                            login({
                                username: JSON.parse(localStorage.getItem('user')).account.username,
                                password,
                            }).then(res => {
                                history.push('/home/discover')
                            })
                        }
                    })
                }
                if (id === 'manager') {
                    becomeManager().then(res => {
                        setMessage(`${res.data.message}`)
                        if (res.status === 201) {
                            login({
                                username: JSON.parse(localStorage.getItem('user')).account.username,
                                password,
                            }).then(res => {
                                history.push('/home/discover')
                            })
                        }
                    })
                }
            }
        })
    }

    return (
        <div className="become">
            <p>{`Enter your password to become ${id}`}</p>
            <input
                type="password"
                value={password}
                onChange={handlePassChange}
                placeholder="Confirm your password"
            />
            {
                (id === 'premium') &&
                <div
                    className="premium-button"
                    onClick={() => successLogin()}
                >
                    <p>Become Premium!</p>
                </div>
            }
            
            {
                (id === 'artist') &&
                
                <div className='form-artist'>
                    <p>Id for the Artist</p>
                    <input
                        type="text"
                        name="id"
                        value={artist.id}
                        onChange={handleInputChange}
                        placeholder="Enter an id for the Artist"
                    />
                    <p>Artistic name</p>
                    <input
                        type="text"
                        name="artistic_name"
                        value={artist.artistic_name}
                        onChange={handleInputChange}
                        placeholder="Enter your Artistic name"
                    />
                    <div
                        className="premium-button"
                        onClick={() => successLogin()}
                    >
                        <p>Become Artist!</p>
                    </div>
                </div>
            }
            
            {
                (id === 'manager') &&
                <div
                    className="premium-button"
                    onClick={() => successLogin()}
                >
                    <p>Become Manager!</p>
                </div>
            }
            <p className="warningbox">{message}</p>
        </div>
    )
}

export default BecomeX