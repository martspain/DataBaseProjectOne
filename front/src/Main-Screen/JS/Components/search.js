import React from "react";
import { search } from "../Services/searchService"
import Album from "./album";
import Artist from "./artist";
import Genre from "./genre";
import Playlist from "./Playlist";
import Song from "./Song";

const Search = (props) =>{
    const [data, setData] = React.useState([])
    const blank = /(^$)/g;

    React.useEffect(() => {
        if (blank.test(props.toFind)) setData([])
        else search(props.toFind).then(res => setData(res))
    }, [props.toFind])

    return(
        <div className="search">
            {
                data.map(result => {
                    switch (result.type) {
                        case 'song':
                            return (
                                <div>
                                    <p>Song</p>
                                    <Song song={result.found} />
                                </div>
                            )
                        case 'artist':
                            return (
                                <div>
                                    <p>Artist</p>
                                    <Artist artist={result.found} />
                                </div>
                            )
                        case 'album':
                            return (
                                <div>
                                    <p>Album</p>
                                    <Album album={result.found} />
                                </div>
                            )
                        case 'genre':
                            return (
                                <div>
                                    <p>Genre</p>
                                    <Genre genre={result.found} />
                                </div>
                            )
                        case 'playlist':
                            return (
                                <div>
                                    <p>Playlist</p>
                                    <Playlist playlist={result.found} />
                                </div>
                            )
                    }
                })
            }
        </div>
    )
}

export default Search