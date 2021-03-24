import React from "react";
import { Link } from "react-router-dom";
import { becomePremium, addPlaylist, getPlaylists, getManagerStats, launchAlbum } from "../utils"
import Playlist from "./playlists";

const UserOptions = () => {
    const [sectionSelected, setSectionSelected] = React.useState('Discover')
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
        </div>
    )
}

export default UserOptions;