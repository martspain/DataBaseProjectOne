import React from "react";
import { recentAlbums } from "../../Services/statisticsService";
import Album from "../album";

const RecentAlbums = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        recentAlbums().then(res => setData(res))
    }, [])

    return (
        <div className="recent-albums">
            <h2>Recent Albums of Last Week</h2>
            <div>
            {
                data.map(album => {
                    return (
                        <Album album={album} />
                    )
                })
            }
            </div>
            {
                (data.length === 0) && <p>There is not albums this week</p>
            }
        </div>
    )
}

export default RecentAlbums