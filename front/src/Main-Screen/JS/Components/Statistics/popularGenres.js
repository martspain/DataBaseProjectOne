import React from "react";
import { popularGenres } from "../../Services/statisticsService";
import Genre from "../genre";

const PopularGenres = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        popularGenres().then(res => setData(res))
    }, [])

    return (
        <div className="popular-genres">
            <h2>Top Popular Genres</h2>
            <div>
            {
                data.map(genre => {
                    return (
                        <div>
                            <p>{genre.rep_por_genero} reproductions</p>
                            <Genre genre={genre} />
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

export default PopularGenres