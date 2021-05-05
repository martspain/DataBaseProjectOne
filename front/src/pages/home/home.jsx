/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import UserOptions from '../../components/user-options/user-options'
import { refreshToken } from '../../services/accountService'
import SCREENS from '../../services/navigation'
import styles from './home.css'

const Home = () => {
  const [refreshTokenValid, setRefreshTokenValid] = useState(false)
  const history = useHistory()

  useEffect(async () => {
    if (!localStorage.getItem('refreshToken')) {
      history.push('/login')
    } else {
      const isValid = await refreshToken()
      if (isValid) {
        setRefreshTokenValid(isValid)
      } else {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        history.push('/login')
      }
    }
  }, [refreshTokenValid])

  return (
    <div className={styles.container}>
      <UserOptions />
      <div className={styles['content-container']}>
        {refreshTokenValid && (
          <>
            <Route path="/" exact component={SCREENS.DISCOVER} />
            <Route path="/become/:id" component={SCREENS.BECOME} />
            <Redirect to="/" />
          </>
        )}
      </div>
    </div>
  )
}

export default Home
