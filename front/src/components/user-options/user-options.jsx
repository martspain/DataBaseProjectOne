import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../services/accountService'
import { actualTrackObservable } from '../../services/reproductionService'
import ButtonLight from '../button-light/button-light'
import styles from './user-options.css'

const UserOptions = () => {
  const [sectionSelected, setSectionSelected] = useState('Discover')
  const [track, setTrack] = useState('')
  const history = useHistory()

  useEffect(() => {
    actualTrackObservable.subscribe((actual) => setTrack(actual))
  }, [track])

  const SectionSelector = ({ text, onClick, active }) => (
    <div className={`${styles['section-selector']} ${active ? styles['section-active'] : ''}`}>
      <button type="button" onClick={onClick}>
        <p>{text}</p>
      </button>
    </div>
  )

  SectionSelector.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  }

  return (
    <div className={styles.container}>
      {!(JSON.parse(localStorage.getItem('user'))?.subscription) && (
        <ButtonLight text="Become Premium!" onClick={() => history.push('/become/premium')} />
      )}
      {!(JSON.parse(localStorage.getItem('user'))?.artist) && (
        <ButtonLight text="Become Artist!" onClick={() => history.push('/become/artist')} />
      )}
      {!(JSON.parse(localStorage.getItem('user'))?.manager) && (
        <ButtonLight text="Become Manager!" onClick={() => history.push('/become/manager')} />
      )}

      <Link to="/">
        <SectionSelector text="Discover" onClick={() => setSectionSelected('Discover')} active={sectionSelected === 'Discover'} />
      </Link>

      {(JSON.parse(localStorage.getItem('user'))?.manager) && (
        <Link to="/statistics">
          <SectionSelector text="View Stats" onClick={() => setSectionSelected('View Stats')} active={sectionSelected === 'View Stats'} />
        </Link>
      )}

      {(JSON.parse(localStorage.getItem('user'))?.manager) && (
        <Link to="/makeMonitor">
          <SectionSelector text="Make Monitor" onClick={() => setSectionSelected('Make Monitor')} active={sectionSelected === 'Make Monitor'} />
        </Link>
      )}

      {(JSON.parse(localStorage.getItem('user'))?.monitor?.monitor_type === 'A') && (
        <Link to="/monitor/updateSong">
          <SectionSelector text="Update Song" onClick={() => setSectionSelected('Update Song')} active={sectionSelected === 'Update Song'} />
        </Link>
      )}

      <Link to="/login">
        <SectionSelector text="Logout" onClick={() => logout()} active={false} />
      </Link>

      <iframe
        title="reproductor"
        className={styles.reproductor}
        src={`https://open.spotify.com/embed/track/${track}`}
        width="300"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
      />
    </div>
  )
}

export default UserOptions
