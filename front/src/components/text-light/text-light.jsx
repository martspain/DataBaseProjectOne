import React from 'react'
import PropTypes from 'prop-types'
import styles from './text-light.css'

const TextLight = ({ text, type }) => (
  <div className={styles.container}>
    {
        ((type === 'text') && <p>{text}</p>)
        || ((type === 'title1') && <h1>{text}</h1>)
        || ((type === 'title2') && <h2>{text}</h2>)
        || ((type === 'title3') && <h3>{text}</h3>)
        || ((type === 'error') && <p className={styles.error}>{text}</p>)
        || ((type === 'warning') && <p className={styles.warning}>{text}</p>)
        || ((type === 'correct') && <p className={styles.correct}>{text}</p>)
        || ((type === 'link') && <span>{text}</span>)
        || ((type === 'section-title') && <h1 className={styles['section-title']}>{text}</h1>)
      }
  </div>
)

TextLight.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
}

TextLight.defaultProps = {
  type: 'text',
}

export default TextLight
