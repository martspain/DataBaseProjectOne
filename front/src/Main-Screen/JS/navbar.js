import "../SCSS/index.scss";
import icon from "../res/icon.png"
import ReactDOM from "react-dom"
import React from "react"

const appName = "Spofity";

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={icon}/>
            <p>{appName}</p>
        </div>
    )
}

export default Navbar