function getManagerStats(){
    //Se obtienen las estadisticas y se despliega la informacion en un nuevo div
    /* TODO */ 
}

function addPlaylist(){
    let playlistName = prompt("Por favor ingrese el nombre de la playlist: ", "Mi playlist.");
    if (playlistName !== "" && playlistName !== null) {
        createPlaylist(father, playlistName);
        alert("Su nueva playlist \"" + playlistName + "\" se ha creado exitosamente");
    }
    else {
        alert("Debe ingresar un nombre para la playlist...")
    }

    //Se añade la nueva playlist a las tablas correspondientes
    /* TODO */
}

function getPlaylists(){
    //Se obtienen las playlist del usuario
    /* TODO */
    
    //Se renderizan las playlists y se retornan
    /*return(
        playlist("Playlist Uno")
        playlist("Playlist Dos")
    )
    */
}

function launchAlbum(){
    //Se solicita la info del album al usuario y se añade a la base de datos 
    /* TODO */

    alert(localStorage.getItem('body'));

}

export {
    getManagerStats,
    addPlaylist,
    getPlaylists,
    launchAlbum,
}