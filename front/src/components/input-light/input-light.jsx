import React from 'react'
import PropTypes from 'prop-types'
import styles from './input-light.css'

const InputLight = ({
  title, type, name, value, onChange, placeHolder, min, max, disabled, checked, list,
}) => (
  <div className={styles.container}>
    <p>{title}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      min={(type === 'number') ? min : ''}
      max={(type === 'number') ? max : ''}
      disabled={disabled}
      checked={checked}
      list={list}
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
  min: PropTypes.string,
  max: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  list: PropTypes.string,
}

InputLight.defaultProps = {
  title: '',
  type: 'text',
  placeHolder: '',
  min: '',
  max: '',
  disabled: false,
  checked: false,
  list: '',
}

export default InputLight
