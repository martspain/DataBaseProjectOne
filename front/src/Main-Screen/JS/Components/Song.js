import React from "react";
import { setTrack } from "../Services/track";

const Song = (props) =>{
    return(
        <div className="song">
            <p>{JSON.stringify(props.song)}</p>
            <button onClick={() => setTrack(props.song.id)} value="play" />
        </div>
    )
}

export default Song;