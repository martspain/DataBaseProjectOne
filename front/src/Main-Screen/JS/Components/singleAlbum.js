import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAlbum } from "../Services/albumService";
import SimpleSong from "./simpleSong";

const SingleAlbum = () =>{
    const [data, setData] = React.useState([])
    const { id } = useParams()

    React.useEffect(() => {
        getAlbum(id).then(res => setData(res))
    }, [])

    return(
        <div className="single-album">
            <div className="info">
                <img src={data.preview_url} />
                <div>
                    <h1>{data.name}</h1>
                    {
                        data.artists?.map(artist => {
                            return (
                                <Link to={`/home/artist/${artist.artist_id}`}>
                                    <p>{artist.artistic_name}</p>
                                </Link>
                            )
                        })
                    }
                    <p>{
                        `${new Date(data.launch_date).getDate()} -
                        ${new Date(data.launch_date).getMonth()+1} -
                        ${new Date(data.launch_date).getFullYear()}`
                    }</p>
                </div>
            </div>
            <div className="single-album-songs">
                <p>Songs of this Album</p>
                {
                    data.songs?.map(song => {
                        return (<SimpleSong song={song} />)
                    })
                }
            </div>
        </div>
    )
}

export default SingleAlbum