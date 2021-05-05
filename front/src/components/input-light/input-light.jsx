import React from 'react'
import PropTypes from 'prop-types'
import styles from './input-light.css'

const InputLight = ({
  title, type, name, value, onChange, placeHolder,
}) => (
  <div className={styles.container}>
    <p>{title}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
    />
  </div>
)

InputLight.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
}

InputLight.defaultProps = {
  title: '',
  type: 'text',
  placeHolder: '',
}

export default InputLight
