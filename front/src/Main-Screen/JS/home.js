import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import magGlassImg from "../res/searchIcon.png";
import UserOptions from "./Components/UserOptions";
import { SCREENS } from "./navigation";

const Home = () => {
    return(
        <div className="page-container">
            <UserOptions />
            <div className="content-container">
                <input className="song-search-bar" type="text" placeholder="Buscar cancion..." />
                <Route path="/home/discover" component={SCREENS.DISCOVER} />
                <Route path="/home/createAlbum" component={SCREENS.CREATEALBUM} />
                <Route path="/home/playlists" component={SCREENS.PLAYLISTS} />
                <Route path="/home/statistics" component={SCREENS.STATISTICS} />
            </div>
        </div>
    )
}

export default Home
