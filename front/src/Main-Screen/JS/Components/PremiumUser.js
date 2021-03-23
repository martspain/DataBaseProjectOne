import React from "react";
import {addPlaylist, getPlaylists} from "../utils"

const premiumUser = () =>{
    return(
        <div>
            <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
            {getPlaylists()}
        </div>
    )
}