import React from "react";
import { Route, useHistory } from "react-router";
import UserOptions from "./Components/UserOptions";
import { SCREENS } from "./navigation";

const Home = () => {
    const [search, setSearch] = React.useState('')
    const history = useHistory()

    const handleInputChange = (event) => {
        const value = event.target.value
        setSearch(value)
        history.push('/home/search')
    }

    return(
        <div className="page-container">
            <UserOptions />
            <div className="content-container">
                <input
                    className="song-search-bar"
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search Song, Album, Artist, Genre or Playlist"
                />
                <Route path="/home/discover" component={SCREENS.DISCOVER} />
                <Route path="/home/createAlbum" component={SCREENS.CREATEALBUM} />
                <Route path="/home/playlists" component={SCREENS.PLAYLISTS} />
                <Route path="/home/statistics" component={SCREENS.STATISTICS} />
                <Route path="/home/search" children={SCREENS.SEARCH(search)} />
            </div>
        </div>
    )
}

export default Home
