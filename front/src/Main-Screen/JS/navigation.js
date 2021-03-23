import Login from "./login"
import Home from "./home"
import React from "react"

const SCREENS = {
    LOGIN: () => (<Login />),
    HOME: () => (<Home />),
}

export {
    SCREENS,
}