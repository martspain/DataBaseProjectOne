import React from "react";
import {getManagerStats, addPlaylist, getPlaylists} from "../utils";

const ManagerUser = () =>{
    return(
        <div>
            <button className="get-stats-option" onClick={getManagerStats()}>Observar estadísticas...</button>
            <button className="add-playlist-option" onClick={addPlaylist()}>Crear nueva playlist...</button>
            {getPlaylists()}
        </div>
    )
}

export default ManagerUser;