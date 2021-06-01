import React from 'react'
import PropTypes from 'prop-types'
import styles from './select-light.css'

const SelectLight = ({
  title,
  name,
  value,
  onChange,
  options,
  defaultOption,
}) => (
  <div className={styles.container}>
    <p>{title}</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value={defaultOption}>{defaultOption}</option>
      {
        options.map((option) => <option key={option} value={option}>{option}</option>)
      }
    </select>
  </div>
)

SelectLight.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultOption: PropTypes.string,
}

SelectLight.defaultProps = {
  title: '',
  defaultOption: 'Select one option',
}

export default SelectLight
