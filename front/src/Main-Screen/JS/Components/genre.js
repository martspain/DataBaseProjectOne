import React from "react";
import { Link } from "react-router-dom";

const Genre = (props) => {
    return (
        <div className="genre">
            <Link to={"/home/genre/" + props.genre.id}>
                <h3>{props.genre.name}</h3>
            </Link>
        </div>
    )
}

export default Genre