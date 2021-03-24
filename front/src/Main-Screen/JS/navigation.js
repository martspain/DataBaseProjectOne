import Login from "./login"
import Home from "./home"
import React from "react"
import Signup from "./register"
import Discover from "./Components/discover"
import CreateAlbum from "./Components/createAlbum"
import Playlists from "./Components/playlists"
import Statistics from "./Components/statistics"
import Search from "./Components/search"

const SCREENS = {
    LOGIN: () => (<Login />),
    SIGNUP: () => (<Signup />),
    HOME: () => (<Home />),
    DISCOVER: () => (<Discover />),
    CREATEALBUM: () => (<CreateAlbum />),
    PLAYLISTS: () => (<Playlists />),
    STATISTICS: () => (<Statistics />),
    SEARCH: (toFind) => (<Search toFind={toFind} />)
}

export {
    SCREENS,
}