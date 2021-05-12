import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TEXTS from '../../services/texts'
import TextLight from '../text-light/text-light'
import styles from './genre.css'

const Genre = ({ id, name }) => (
  <div className={styles.container}>
    <Link to={`/genre/${id}`}>
      <TextLight text={name} type={TEXTS.TITLE3} />
    </Link>
  </div>
)

Genre.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Genre
