import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './album.css'

const Album = ({ album }) => (
  (album.active)
    ? (
      <div className={styles.container}>
        <Link to={`/album/${album.id}`}>
          <img src={album.preview_url} alt={`${album.name} album`} />
          <h3>{album.name}</h3>
        </Link>
        <div>
          {
          album.artists?.map((artist) => (
            <Link key={artist.artist_id} to={`/artist/${artist.artist_id}`}>
              <p>{`${artist.artistic_name}, `}</p>
            </Link>
          ))
        }
        </div>
        <p>
          {
        `${new Date(album.launch_date).getDate()} -
        ${new Date(album.launch_date).getMonth() + 1} -
        ${new Date(album.launch_date).getFullYear()}`
      }
        </p>
      </div>
    ) : (
      <div className={styles['inactive-container']}>
        <div>
          <img src={album.preview_url} alt={`${album.name} album`} />
          <h3>{album.name}</h3>
        </div>
        <div>
          {
          album.artists?.map((artist) => (
            <p key={artist.artist_id}>{`${artist.artistic_name}, `}</p>
          ))
        }
        </div>
        <p>
          {
        `${new Date(album.launch_date).getDate()} -
        ${new Date(album.launch_date).getMonth() + 1} -
        ${new Date(album.launch_date).getFullYear()}`
      }
        </p>
      </div>
    )
)

Album.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    preview_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(PropTypes.shape({
      artist_id: PropTypes.string.isRequired,
      artistic_name: PropTypes.string.isRequired,
    }).isRequired),
    launch_date: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Album
