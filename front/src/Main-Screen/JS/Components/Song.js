import React from "react";
//import ReactDOM from "react-dom";
import songImg from "../res/musicIcon";

const Song = (name, artist) =>{
    return(
        <div className="song">
            <img className="song-img" src={songImg} alt="Ups! No se encontró la imagen :("></img>
            <h1 className="song-name">{name}</h1>
            <h2 className="song-artist">{artist}</h2>
        </div>
    )
}

export default Song;