import React from "react";
import {becomePremium} from "../utils";
import Playlist from "./Playlist";

const FreeUser = () =>{
    return(
        <div>
            <button className="premium-option" onClick={becomePremium()}>¡Vuelvete Premium!</button>
            {Playlist("Tu Playlist")}
        </div>
    )
}

export default FreeUser;