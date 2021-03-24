import React from "react";
import LargestProductionArtists from "./Statistics/largestProductionArtists";
import MostActiveAccounts from "./Statistics/mostActiveAccounts";
import PopularArtists from "./Statistics/popularArtists";
import PopularGenres from "./Statistics/popularGenres";
import RecentAlbums from "./Statistics/recentAlbums"
import SubscriptionCount from "./Statistics/subscriptionCount";

const Statistics = () =>{
    return(
        <div className="statistics">
            <h1>Statistics</h1>
            <RecentAlbums />
            <PopularArtists />
            <SubscriptionCount />
            <LargestProductionArtists />
            <PopularGenres />
            <MostActiveAccounts />
        </div>
    )
}

export default Statistics;