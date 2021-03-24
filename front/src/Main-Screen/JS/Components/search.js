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
        <div>
            {
                data.map(result => {
                    switch (result.type) {
                        case 'song':
                            return (<Song song={result.found} />)
                        case 'artist':
                            return (<Artist artist={result.found} />)
                        case 'album':
                            return (<Album album={result.found} />)
                        case 'genre':
                            return (<Genre genre={result.found} />)
                        case 'playlist':
                            return (<Playlist playlist={result.found} />)
                    }
                })
            }
        </div>
    )
}

export default Search