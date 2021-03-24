import React from "react";
import { getAllAlbums } from "../Services/albumService";
import Album from "./album";

const Discover = () =>{
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        getAllAlbums().then(res => setData(res))
    }, [])

    return(
        <div className="discover-grid">
            <h1>Discover Music</h1>
            <div>
            {
                data.map(album => {
                    return (
                        <Album album={album} />
                    )
                })
            }
            </div>
        </div>
    )
}

export default Discover