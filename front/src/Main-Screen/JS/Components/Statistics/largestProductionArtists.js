import React from "react";
import { Link } from "react-router-dom";
import { largestProductionArtists } from "../../Services/statisticsService";
import Artist from "../artist";

const LargestProductionArtists = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        largestProductionArtists().then(res => setData(res))
    }, [])

    return (
        <div className="largest-production-artists">
            <h2>Top Artists with the largest musical production</h2>
            <div>
            {
                data.map(artist => {
                    return (
                        <div>
                            <p>{artist.canciones_por_artista} songs</p>
                            <Artist artist={artist} />
                        </div>
                    )
                })
            }
            </div>
            {
                (data.length === 0) && <p>There is not popular genres</p>
            }
        </div>
    )
}

export default LargestProductionArtists