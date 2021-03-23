import Navbar from "./navbar"
import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { SCREENS } from "./navigation"

const htmlRoot = document.getElementById('root')

const Principal = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Route exact={true} path="/" component={SCREENS.LOGIN} />
        <Route path="/home" component={SCREENS.HOME} />
        <Route path="/signup" component={SCREENS.SIGNUP}/>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <Principal />,
  htmlRoot,
)