import React from "react";
import { Link } from "react-router-dom";
import { becomePremium, addPlaylist, getPlaylists, getManagerStats, launchAlbum } from "../utils"
import Playlist from "./playlists";
import { actualTrackObs, getTrack } from "../Services/track"

const UserOptions = () => {
    const [sectionSelected, setSectionSelected] = React.useState('Discover')
    const [track, setTrack] = React.useState('')

    React.useEffect(() => {
        actualTrackObs.subscribe(actual => setTrack(actual))
    }, [track])

    return (
        <div className="user-options">
            {!(JSON.parse(localStorage.getItem('user'))?.subscription) &&
                <div
                    className="premium-button"
                    onClick={() => becomePremium()}
                >
                    <p>Become Premium!</p>
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
            {(JSON.parse(localStorage.getItem('user'))?.artist) &&
                <div>
                    <button className="launch-album-option" onClick={() => launchAlbum()}>Create Album</button>
                </div>
            }
            
            <iframe
                className="reproductor"
                src={`https://open.spotify.com/embed/track/${track}`}
                width="300"
                height="80"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
            />
        </div>
    )
}

export default UserOptions;