import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import magGlassImg from "../res/searchIcon.png";
import { SCREENS } from "./navigation";

const Home = () => {
    return(
        <div className="page-container">
            <div className="title-content">
                <h1 className="title">Name</h1>
            </div>
            {(JSON.parse(localStorage.getItem('user'))?.artist) &&
                <div className="option-bar">
                    <input className="playlist-search-bar" type="text" placeholder="Buscar playlist..."></input>
                    <Link to="/home/discover">
                        <button>Discover</button>
                    </Link>
                    <input className="playlist-search-img" type="image" alt="Search" src={magGlassImg}></input>
                </div>
            }
            <div className="content-container">
                <input className="song-search-bar" type="text" placeholder="Buscar cancion..."></input>
                <input className="song-search-img" type="image" alt="Search" src={magGlassImg}></input>
            </div>
        </div>
    )
}

export default Home
