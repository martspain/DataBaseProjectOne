import React from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../Services/playlistsService";
//import ReactDOM from "react-dom";

const Playlists = () =>{
    const [data, setData] = React.useState([])
    React.useEffect( () => {
        getPlaylists().then(res => setData(res))
    }, [])
    return(
        <div className="playlist">
            <h1 className="playlist-name">Playlist</h1>
            {data.map(Playlist => {
                return(
                    <div>
                        <Link to={"/home/playlist/" + Playlist.id}>
                            <p>{Playlist.name}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Playlists;