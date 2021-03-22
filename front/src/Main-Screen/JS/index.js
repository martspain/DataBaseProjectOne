//Se importa el estilo
import "../SCSS/index.scss";
import img from "../res/musicIcon.png";
import magGlassImg from "../res/searchIcon.png";

//Nombre a mostrar en el titulo
let appName = "Spofity";

//Contenedor de toda la pagina
let pageContainer = document.createElement("div");
pageContainer.setAttribute("class", "page-container");
document.body.appendChild(pageContainer);

//Contenedor del titulo
let titleContainer = document.createElement("div");
titleContainer.setAttribute("class", "title-content");

//Contenido del titulo
let title = document.createElement("h1");
title.setAttribute("class", "title");
title.innerHTML = appName;

//Se adjuntan los hijos (DOM)
titleContainer.appendChild(title);
pageContainer.appendChild(titleContainer);

//Barra de opciones (navegacion)
let optionBar = document.createElement("div");
optionBar.setAttribute("class", "option-bar");
pageContainer.appendChild(optionBar);

//createFreeUserOptions(optionBar);
createPremiumUserOptions(optionBar);

//Contenedor del contenido de reproduccion
let frameContainer = document.createElement("div");
frameContainer.setAttribute("class", "content-container");
let songSearchBar = document.createElement("input");
songSearchBar.setAttribute("class", "song-search-bar");
songSearchBar.setAttribute("type", "text");
songSearchBar.setAttribute("placeholder", "Buscar cancion...");
frameContainer.appendChild(songSearchBar);

pageContainer.appendChild(frameContainer);

createSong(frameContainer, "Rola", "Artista");
createSong(frameContainer, "Rola2", "Artista2");
createSong(frameContainer, "Rola3", "Artista3");

//Crea una frame de cancion y lo agrega al padre
function createSong(father, name, artist){
    let song = document.createElement("div");
    song.setAttribute("class", "song");

    let songImg = document.createElement("img");
    songImg.setAttribute("class", "song-img");
    songImg.setAttribute("src", img);
    songImg.setAttribute("alt", "Ups! No se encontro la imagen :(");
    song.appendChild(songImg);

    let songName = document.createElement("h1");
    songName.setAttribute("class", "song-name");
    songName.innerHTML = name;
    song.appendChild(songName);

    let songArtist = document.createElement("h2");
    songArtist.setAttribute("class", "song-artist");
    songArtist.innerHTML = artist;
    song.appendChild(songArtist);

    father.appendChild(song);

}

//Crea las opciones para un usuario gratuito
function createFreeUserOptions(father){

    let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Buscar playlist...");
    searchBar.setAttribute("class", "playlist-search-bar");

    let searchImg = document.createElement("input");
    searchImg.setAttribute("class", "playlist-search-img");
    searchImg.setAttribute("type", "image");
    searchImg.setAttribute("alt", "Search");
    searchImg.setAttribute("src", magGlassImg);


    let option = document.createElement("button");
    option.setAttribute("class", "premium-option");
    option.onclick = function(){becomePremium()};
    option.innerHTML = "¡Vuelvete Premium!";

    father.appendChild(searchBar);
    father.appendChild(searchImg);
    father.appendChild(option);

    //Se crea la unica playlist (default) del usuario freemium
    createPlaylist(father, "Tu Playlist.");
}

function createPremiumUserOptions(father){
    let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Buscar playlist...");
    searchBar.setAttribute("class", "playlist-search-bar");

    let searchImg = document.createElement("input");
    searchImg.setAttribute("class", "playlist-search-img");
    searchImg.setAttribute("type", "image");
    searchImg.setAttribute("alt", "Search");
    searchImg.setAttribute("src", magGlassImg);

    father.appendChild(searchBar);
    father.appendChild(searchImg);

    let addPlaylistOption = document.createElement("button");
    addPlaylistOption.setAttribute("class", "add-playlist-option");
    addPlaylistOption.onclick = function(){addPlaylist(father)};
    addPlaylistOption.innerHTML = "Crear nueva playlist...";
    father.appendChild(addPlaylistOption);

    //Se añaden las playlists relacionadas con el usuario registrado
    createPlaylist(father, "Playlist 1 :D");
    createPlaylist(father, "Playlist 2 :D");
    createPlaylist(father, "Playlist 3 :D");
}

//En esta funcion se debe actualizar toda la info en las tablas para volver a usuario premium
function becomePremium(){
    alert("Su solicitud será procesada. Tomará un día actualizar su cuenta a la versión premium. Gracias por usar Sofity!");
}

//En esta funcions se debe crear una nueva playlist
function addPlaylist(father){
    let playlistName = prompt("Por favor ingrese el nombre de la playlist: ", "Mi playlist.");
    if(playlistName !== "" && playlistName !== null){
        createPlaylist(father, playlistName);
        alert("Su nueva playlist \"" + playlistName + "\" se ha creado exitosamente");
    }
    else{
        alert("Debe ingresar un nombre para la playlist...")
    }
}

function createPlaylist(father, name){
    let playlist = document.createElement("div");
    playlist.setAttribute("class", "playlist");
    
    let playlistName = document.createElement("h1");
    playlistName.setAttribute("class", "playlist-name");
    playlistName.innerHTML = name;

    playlist.appendChild(playlistName);
    father.appendChild(playlist);

}