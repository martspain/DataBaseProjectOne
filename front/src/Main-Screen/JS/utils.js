export default function getManagerStats(){
    //Se obtienen las estadisticas y se despliega la informacion en un nuevo div
    /* TODO */ 
}

export default function becomePremium(){
    //Se da feedback al usuario que su solcitud sera procesada
    alert("Su solicitud será procesada. Tomará un día actualizar su cuenta a la versión premium. Gracias por usar Sofity!");
    
    //Se añade la subscripcion al api
    /* TODO */
}

export default function addPlaylist(){
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

export default function getPlaylists(){
    //Se obtienen las playlist del usuario
    /* TODO */
    
    //Se renderizan las playlists y se retornan
    /*return(
        playlist("Playlist Uno")
        playlist("Playlist Dos")
    )
    */
}

export default function launchAlbum(){
    //Se solicita la info del album al usuario y se añade a la base de datos 
    /* TODO */
}