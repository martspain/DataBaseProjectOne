import React from 'react'
import icon from './resources/icon.png'
import styles from './top-bar.css'

const appName = 'Spofity'

const TopBar = () => {
  return (
    <div className={styles.container}>
      <img src={icon} />
      <p>{appName}</p>
    </div>
  )
}

export default TopBar
