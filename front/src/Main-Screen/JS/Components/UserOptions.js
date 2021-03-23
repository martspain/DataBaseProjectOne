import React from "react";
import {becomePremium, addPlaylist, getPlaylists, getManagerStats, launchAlbum} from "../utils"
import Playlist from "./Playlist";

const UserOptions = () =>{
    return(
        <div>
            {(JSON.parse(localStorage.getItem('user'))?.artist) &&
                <div>
                    <button className="launch-album-option" onClick={launchAlbum()}></button>
                    <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
                    {getPlaylists()}
                </div>
            }
            {(JSON.parse(localStorage.getItem('user'))?.manager) &&
                <div>
                    <button className="get-stats-option" onClick={getManagerStats()}>Observar estadísticas...</button>
                    <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
                    {getPlaylists()}
                </div>
            }
            {(JSON.parse(localStorage.getItem('user'))?.subscription) &&
                <div>
                    <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
                    {getPlaylists()}
                </div>
            }
            {!(JSON.parse(localStorage.getItem('user'))?.subscription) &&
                <div>
                    <button className="premium-option" onClick={becomePremium()}>¡Vuelvete Premium!</button>
                    {Playlist("Tu Playlist")}
                </div>
            }
        </div>
    )
}

export default UserOptions;