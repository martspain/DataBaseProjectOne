import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getArtist } from "../Services/artistService";
import Album from "./album";
import SimpleSong from "./simpleSong";

const SingleArtist = () =>{
    const [data, setData] = React.useState([])
    const { id } = useParams()

    React.useEffect(() => {
        getArtist(id).then(res => setData(res))
    }, [])

    return(
        <div className="single-artist">
            <h1>{data.artistic_name}</h1>
            <p>Albums</p>
            <div className="single-artist-albums">
            {
                data.albums?.map(album => {
                    return (<Album album={album} />)
                })
            }
            </div>
            <p>Songs</p>
            <div className="single-artist-songs">
            {
                data.songs?.map(song => {
                    return (<SimpleSong song={song} />)
                })
            }
            </div>
        </div>
    )
}

export default SingleArtist