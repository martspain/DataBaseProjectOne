import React from 'react'
import Become from '../pages/become/become'
import Binnacle from '../pages/binnacle/binnacle'
import DeactivateInactiveFree from '../pages/deactivate-inactive-free/deactivate-inactive-free'
import RemoveSubscriptions from '../pages/remove-subscriptions/remove-subscriptions'
import Discover from '../pages/discover/discover'
import Login from '../pages/login/login'
import MakeMonitor from '../pages/make-monitor/make-monitor'
import SearchResults from '../pages/search-results/search-results'
import Signup from '../pages/signup/signup'
import SingleAlbum from '../pages/single-album/single-album'
import SingleArtist from '../pages/single-artist/single-artist'
import SingleGenre from '../pages/single-genre/single-genre'
import Statistics from '../pages/statistics/statistics'
import UpdateAlbum from '../pages/update-album/update-album'
import UpdateSong from '../pages/update-song/update-song'
import DeactivateArtists from '../pages/deactivate-artists/deactivate-artists'
import GenerateReproductions from '../pages/generate-reproductions/generate-reproductions'
import MigrateReproductionsPerDate from '../pages/migrate-reproductions-per-date/migrate-reproductions-per-date'

const SCREENS = {
  LOGIN: () => (<Login />),
  SIGNUP: () => (<Signup />),
  DISCOVER: () => (<Discover />),
  BECOME: () => (<Become />),
  STATISTICS: () => (<Statistics />),
  ALBUM: () => (<SingleAlbum />),
  ARTIST: () => (<SingleArtist />),
  GENRE: () => (<SingleGenre />),
  SEARCH: (toFind) => (<SearchResults toFind={toFind} />),
  MONITOR: () => (<MakeMonitor />),
  UPDATESONG: () => (<UpdateSong />),
  UPDATEALBUM: () => (<UpdateAlbum />),
  BINNACLE: () => (<Binnacle />),
  REMOVESUBSCRIPTIONS: () => (<RemoveSubscriptions />),
  DEACTIVATEINACTIVEFREE: () => (<DeactivateInactiveFree />),
  DEACTIVATEARTISTS: () => (<DeactivateArtists />),
  GENERATEREPRODUCTIONS: () => (<GenerateReproductions />),
  MIGRATEREPSPERDATE: () => (<MigrateReproductionsPerDate />),
}

export default SCREENS
