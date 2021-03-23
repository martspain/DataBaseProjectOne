import Login from "./login"
import Home from "./home"
import React from "react"
import Signup from "./register"

const SCREENS = {
    LOGIN: () => (<Login />),
    SIGNUP: () => (<Signup />),
    HOME: () => (<Home />),
}

export {
    SCREENS,
}