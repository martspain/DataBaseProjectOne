import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './playlist.css'
import TextLight from '../text-light/text-light'
import TEXTS from '../../services/texts'

const Playlist = ({ playlist }) => (
  <div className={styles.container}>
    <Link to={`/playlist/${playlist.id}`}>
      <TextLight text={playlist.name} type={TEXTS.TITLE3} />
      <TextLight text={`by ${playlist.username}`} type={TEXTS.TEXT} />
    </Link>
  </div>
)

Playlist.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
}

export default Playlist
