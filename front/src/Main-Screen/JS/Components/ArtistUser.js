import React from "react";
import {launchAlbum, addPlaylist, getPlaylists} from "../utils";

const ArtistUser = () =>{
    return(
        <div>
            <button className="launch-album-option" onClick={launchAlbum()}></button>
            <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
            {getPlaylists()}
        </div>
    )
}

export default ArtistUser;