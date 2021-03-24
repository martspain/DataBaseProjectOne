import React from "react";
import { Link } from "react-router-dom";
import { actualTrackObs, setTrack } from "../Services/track";

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const SimpleSong = (props) =>{
    const [actualTrack, setActualTrack] = React.useState('')

    React.useEffect(() => {
        actualTrackObs.subscribe(actual => setActualTrack(actual))
    }, [actualTrack])

    return(
        <div className="simple-song">
            <div className="simple-play-song" onClick={() => setTrack(props.song.id)}>
                <button value="play">
                    <div className={(actualTrack===props.song.id) && "playing"} />
                </button>
                <h3 className={(actualTrack===props.song.id) && "playing-title"}>{props.song.name}</h3>
            </div>
            <div className="simple-song-artists">
            {
                props.song.artists?.map(artist => {
                    return(
                        <Link to={"/home/artist/" + artist.artist_id}>
                            <p>{artist.artistic_name+", "}</p>
                        </Link>
                    )
                })
            }
            </div>
            <p>{millisToMinutesAndSeconds(props.song.duration_ms)}</p>
        </div>
    )
}

export default SimpleSong;