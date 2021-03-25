import React from "react";
import { Route, useHistory } from "react-router";
import BecomeX from "./Components/become";
import SingleAlbum from "./Components/singleAlbum";
import SingleArtist from "./Components/singleArtist";
import SingleGenre from "./Components/singleGenre";
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
                <Route path="/home/album/:id" component={SingleAlbum} />
                <Route path="/home/become/:id" component={BecomeX} />
                <Route path="/home/artist/:id" component={SingleArtist} />
                <Route path="/home/genre/:id" component={SingleGenre} />
            </div>
        </div>
    )
}

export default Home
