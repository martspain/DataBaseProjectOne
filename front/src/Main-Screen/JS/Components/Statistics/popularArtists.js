import React from "react";
import { popularArtists } from "../../Services/statisticsService";
import Artist from "../artist";

const PopularArtists = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        popularArtists().then(res => setData(res))
    }, [])

    return (
        <div className="popular-artists">
            <h2>Top Artists with increasing popularity in the last 3 months</h2>
            <div>
            {
                data.map(artist => {
                    return (
                        <div>
                            <p>{artist.rep_por_artista} reproductions</p>
                            <Artist artist={artist} />
                        </div>
                    )
                })
            }
            </div>
            {
                (data.length === 0) && <p>There is not artists here</p>
            }
        </div>
    )
}

export default PopularArtists