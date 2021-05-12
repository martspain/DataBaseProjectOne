import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextLight from '../text-light/text-light'
import styles from './artist.css'
import TEXTS from '../../services/texts'

const Artist = ({ id, artisticName }) => (
  <div className={styles.container}>
    <Link to={`/artist/${id}`}>
      <TextLight text={artisticName} type={TEXTS.TITLE3} />
    </Link>
  </div>
)

Artist.propTypes = {
  id: PropTypes.string.isRequired,
  artisticName: PropTypes.string.isRequired,
}

export default Artist
