import Login from "./login"
import Home from "./home"
import React from "react"
import Signup from "./register"
import Discover from "./Components/discover"
import CreateAlbum from "./Components/createAlbum"

const SCREENS = {
    LOGIN: () => (<Login />),
    SIGNUP: () => (<Signup />),
    HOME: () => (<Home />),
    DISCOVER: () => (<Discover />),
    CREATEALBUM: () => (<CreateAlbum />),
}

export {
    SCREENS,
}