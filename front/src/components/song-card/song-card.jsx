import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { actualTrackObservable, setTrack } from '../../services/reproductionService'
import styles from './song-card.css'

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const SongCard = ({ song }) => {
  const [actualTrack, setActualTrack] = useState('')

  useEffect(() => {
    actualTrackObservable.subscribe((actual) => setActualTrack(actual))
  }, [actualTrack])

  return (
    <div className={styles.container}>
      <div>
        <button type="button" onClick={() => setTrack(song.id)} value="play">
          <div className={(actualTrack === song.id) ? styles.playing : {}} />
        </button>
        <img src={song.cover} alt="song album cover" />
      </div>
      <h3>{song.name}</h3>
      <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
      <div>
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
      <Link to={`/album/${song.album_id}`}>
        <h4>{song.album}</h4>
      </Link>
    </div>
  )
}

SongCard.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    duration_ms: PropTypes.number,
    album: PropTypes.string,
    album_id: PropTypes.string,
    artists: PropTypes.arrayOf(PropTypes.shape({
      artist_id: PropTypes.string,
      artistic_name: PropTypes.string,
    })),
  }).isRequired,
}

export default SongCard
