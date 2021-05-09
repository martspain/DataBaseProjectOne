import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { actualTrackObservable, setTrack } from '../../services/reproductionService'
import styles from './simple-song.css'

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const SimpleSong = ({ song }) => {
  const [actualTrack, setActualTrack] = useState('')

  useEffect(() => {
    actualTrackObservable.subscribe((actual) => setActualTrack(actual))
  }, [actualTrack])

  return (
    <div className={styles.container}>
      <button type="button" value="play" onClick={() => setTrack(song.id)}>
        <div className={styles['simple-play-song']}>
          <div>
            <div className={(actualTrack === song.id) ? styles.playing : {}} />
          </div>
          <h3 className={(actualTrack === song.id) ? styles['playing-title'] : {}}>{song.name}</h3>
        </div>
      </button>
      <div className={styles['simple-song-artists']}>
        {
        song.artists?.map((artist) => (
          <React.Fragment key={artist.artist_id}>
            <Link to={`/artist/${artist.artist_id}`}>
              <p>{`${artist.artistic_name}, `}</p>
            </Link>
          </React.Fragment>
        ))
      }
      </div>
      <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
    </div>
  )
}

SimpleSong.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    artists: PropTypes.arrayOf(PropTypes.shape({
      artist_id: PropTypes.string,
      artistic_name: PropTypes.string,
    })),
    duration_ms: PropTypes.number,
  }).isRequired,
}

export default SimpleSong
