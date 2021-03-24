import React from "react";
import { Link } from "react-router-dom";

const Album = (props) => {
    return (
        <div className="album">
            <Link to={"/home/album/" + props.album.id}>
                <img src={props.album.preview_url} />
                <h3>{props.album.name}</h3>
            </Link>
            <div>
            {
                props.album.artists.map(artist => {
                    return(
                        <Link to={"/home/artist/" + artist.artist_id}>
                            <p>{artist.artistic_name+", "}</p>
                        </Link>
                    )
                })
            }
            </div>
            <p>{
                `${new Date(props.album.launch_date).getDate()} -
                ${new Date(props.album.launch_date).getMonth()+1} -
                ${new Date(props.album.launch_date).getFullYear()}`
            }</p>
        </div>
    )
}

export default Album