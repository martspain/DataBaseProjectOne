import React from "react";
import { Link, useHistory } from "react-router-dom";
import { becomePremium, launchAlbum } from "../utils"
import { actualTrackObs } from "../Services/track"

const UserOptions = () => {
    const [sectionSelected, setSectionSelected] = React.useState('Discover')
    const [track, setTrack] = React.useState('')
    const history = useHistory()

    React.useEffect(() => {
        actualTrackObs.subscribe(actual => setTrack(actual))
    }, [track])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <div className="user-options">
            {!(JSON.parse(localStorage.getItem('user'))?.subscription) &&
                <div
                    className="premium-button"
                    onClick={() => history.push("/home/become/premium")}
                >
                    <p>Become Premium!</p>
                </div>
            }
            {!(JSON.parse(localStorage.getItem('user'))?.artist) &&
                <div
                    className="premium-button"
                    onClick={() => history.push("/home/become/artist")}
                >
                    <p>Become Artist!</p>
                </div>
            }
            {!(JSON.parse(localStorage.getItem('user'))?.manager) &&
                <div
                    className="premium-button"
                    onClick={() => history.push("/home/become/manager")}
                >
                    <p>Become Manager!</p>
                </div>
            }
            <Link to="/home/discover">
                <div
                    className={"section-selector " + ((sectionSelected === "Discover") ? "selected" : "")}
                    onClick={() => setSectionSelected('Discover')}
                >
                    <p>Discover</p>
                </div>
            </Link>
            <Link to="/home/playlists">
                <div
                    className={"section-selector " + ((sectionSelected === "Playlists") ? "selected" : "")}
                    onClick={() => setSectionSelected('Playlists')}
                >
                    <p>My Playlists</p>
                </div>
            </Link>
            {(JSON.parse(localStorage.getItem('user'))?.manager) &&
                <Link to="/home/statistics">
                    <div
                        className={"section-selector " + ((sectionSelected === "Statistics") ? "selected" : "")}
                        onClick={() => setSectionSelected('Statistics')}
                    >
                        <p>Ver Estadísticas</p>
                    </div>
                </Link>
            }
            <Link to="/">
                <div
                    className="section-selector"
                    onClick={() => logout()}
                >
                    <p>Logout</p>
                </div>
            </Link>
            
            <iframe
                className="reproductor"
                src={`https://open.spotify.com/embed/track/${track}`}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            />
        </div>
    )
}

export default UserOptions;