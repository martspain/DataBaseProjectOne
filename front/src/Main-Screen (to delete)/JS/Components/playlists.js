import React from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../Services/playlistsService";
//import ReactDOM from "react-dom";

const Playlists = () =>{
    const [data, setData] = React.useState([])
    React.useEffect( () => {
        getPlaylists().then(res => setData(res))
    }, [])
    return(
        <div>
            {data?.map((Play) => 
                <div key={Play.id} className="playlist">
                    <Link to={"/home/playlist/" + Play.id}>
                        <h3>{Play.name}</h3>
                        <p>{`Creada por: ${Play.username}`}</p>
                    </Link>
                </div>  
            )}
        </div>
    )
}

export default Playlists;