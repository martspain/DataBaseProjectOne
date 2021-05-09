import React from 'react'
import Become from '../pages/become/become'
import Discover from '../pages/discover/discover'
import Login from '../pages/login/login'
import SearchResults from '../pages/search-results/search-results'
import Signup from '../pages/signup/signup'
import SingleAlbum from '../pages/single-album/single-album'
import SingleArtist from '../pages/single-artist/single-artist'
import SingleGenre from '../pages/single-genre/single-genre'
import Statistics from '../pages/statistics/statistics'

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
}

export default SCREENS
