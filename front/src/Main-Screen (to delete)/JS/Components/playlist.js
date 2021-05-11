import React from "react";
import { Link } from "react-router-dom";

const Playlist = (props) => {
    return (
        <div className="playlist">
            <Link to={"/home/playlist/" + props.playlist.id}>
                <h3>{props.playlist.name}</h3>
                <p>{`by ${props.playlist.username}`}</p>
            </Link>
        </div>
    )
}

export default Playlist
