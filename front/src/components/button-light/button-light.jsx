import React from 'react'
import PropTypes from 'prop-types'
import styles from './button-light.css'

const ButtonLight = ({ text, onClick }) => (
  <div className={styles.container}>
    <button type="button" onClick={onClick}>
      <p>
        {text}
      </p>
    </button>
  </div>
)

ButtonLight.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonLight
