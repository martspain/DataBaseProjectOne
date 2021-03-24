import React from "react";
import { Link } from "react-router-dom";

const Artist = (props) => {
    return (
        <div className="artist">
            <Link to={"/home/artist/" + props.artist.id}>
                <h3>{props.artist.artistic_name}</h3>
            </Link>
        </div>
    )
}

export default Artist