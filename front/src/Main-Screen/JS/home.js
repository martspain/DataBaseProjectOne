//Se importa el estilo
import "../SCSS/index.scss";
import magGlassImg from "../res/searchIcon.png";
import React from "react";
//import ReactDOM from "react-dom";

const Home = (name, userType) =>{
    return(
        <div className="page-container">
            <div className="title-content">
                <h1 class="title">{name}</h1>
            </div>
            <div className="option-bar">
                <input className="playlist-search-bar" type="text" placeholder="Buscar playlist..."></input>
                <input className="playlist-search-img" type="image" alt="Search" src={magGlassImg}></input>
                
            </div>
            <div className="content-container">
                <input className="song-search-bar" type="text" placeholder="Buscar cancion..."></input>
                <input className="song-search-img" type="image" alt="Search" src={magGlassImg}></input>

            </div>
        </div>
    )
}

export default Home;
