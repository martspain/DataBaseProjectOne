import React from "react";
import { useParams } from "react-router";
import { getGenre } from "../Services/genreService";
import SimpleSong from "./simpleSong";

const SingleGenre = () =>{
    const [data, setData] = React.useState([])
    const { id } = useParams()

    React.useEffect(() => {
        getGenre(id).then(res => setData(res))
    }, [])

    return(
        <div className="single-artist">
            <h1>{data.name}</h1>
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

export default SingleGenre