import React from "react";
import { Link } from "react-router-dom";
import { actualTrackObs, setTrack } from "../Services/track";

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const Song = (props) =>{
    const [actualTrack, setActualTrack] = React.useState('')

    React.useEffect(() => {
        actualTrackObs.subscribe(actual => setActualTrack(actual))
    }, [actualTrack])

    return(
        <div className="song">
            <div>
                <button onClick={() => setTrack(props.song.id)} value="play">
                    <div className={(actualTrack===props.song.id) && "playing"} />
                </button>
                <img src={props.song.cover} />
            </div>
            <h3>{props.song.name}</h3>
            <p>{millisToMinutesAndSeconds(props.song.duration_ms)}</p>
            <div>
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
            <Link to={"/home/album/"+props.song.album_id}>
                <h4>{props.song.album}</h4>
            </Link>
        </div>
    )
}

export default Song;