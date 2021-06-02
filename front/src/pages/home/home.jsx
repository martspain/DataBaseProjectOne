import React, { useState, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import UserOptions from '../../components/user-options/user-options'
import { refreshToken } from '../../services/accountService'
import SCREENS from '../../services/navigation'
import styles from './home.css'

const Home = () => {
  const [refreshTokenValid, setRefreshTokenValid] = useState(false)
  const [search, setSearch] = useState('')
  const history = useHistory()

  const handleInputChange = (event) => {
    const { value } = event.target
    setSearch(value)
    history.push('/search')
  }

  useEffect(async () => {
    if (!localStorage.getItem('refreshToken')) {
      history.push('/login')
    } else {
      const isValid = await refreshToken()
      if (isValid) {
        setRefreshTokenValid(isValid)
      } else {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        history.push('/login')
      }
    }
  }, [refreshTokenValid])

  return (
    <div className={styles.container}>
      <UserOptions />
      <div className={styles['content-container']}>
        <input
          className={styles['song-search-bar']}
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Search Song, Album, Artist, Genre or Playlist"
        />
        {refreshTokenValid && (
          <>
            <Route path="/" exact component={SCREENS.DISCOVER} />
            <Route path="/become/:id" component={SCREENS.BECOME} />
            <Route path="/statistics" component={SCREENS.STATISTICS} />
            <Route path="/album/:id" component={SCREENS.ALBUM} />
            <Route path="/artist/:id" component={SCREENS.ARTIST} />
            <Route path="/genre/:id" component={SCREENS.GENRE} />
            <Route path="/search" render={() => SCREENS.SEARCH(search)} />
            <Route path="/makeMonitor" component={SCREENS.MONITOR} />
            <Route path="/monitor/updateSong" component={SCREENS.UPDATESONG} />
            <Route path="/monitor/updateAlbum" component={SCREENS.UPDATEALBUM} />
            <Route path="/monitor/deactivateInactiveFree" component={SCREENS.DEACTIVATEINACTIVEFREE} />
            <Route path="/monitor/removeSubscriptions" component={SCREENS.REMOVESUBSCRIPTIONS} />
            <Route path="/monitor/deactivateArtists" component={SCREENS.DEACTIVATEARTISTS} />
            <Route path="/monitor/binnacle" component={SCREENS.BINNACLE} />
            <Route path="/generateReproductions" component={SCREENS.GENERATEREPRODUCTIONS} />
            <Route path="/migrateReproductionsPerDate" component={SCREENS.MIGRATEREPSPERDATE} />
            <Route path="/recommendationToUser" component={SCREENS.RECOMMENDATIONTOUSER} />
            <Redirect to="/" />
          </>
        )}
      </div>
    </div>
  )
}

export default Home
