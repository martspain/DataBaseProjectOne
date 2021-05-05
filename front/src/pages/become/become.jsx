import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { login } from '../../services/accountService'
import { becomeArtist } from '../../services/artistService'
import { becomeManager, becomePremium } from '../../services/subscriptionService'
import TEXTS from '../../services/texts'
import styles from './become.css'

const Become = () => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [artist, setArtist] = useState({
    id: '',
    artistic_name: '',
  })
  const { id } = useParams()
  const history = useHistory()

  const handlePassChange = (event) => {
    const { value } = event.target
    setPassword(value)
  }

  const handleInputArtistChange = (event) => {
    const { value } = event.target
    const { name } = event.target
    setArtist((old) => ({ ...old, [name]: value }))
  }

  const successLogin = () => {
    login({
      username: JSON.parse(localStorage.getItem('user')).account.username,
      password,
    }).then((res) => {
      if (res.message) setMessage(res.message)
      else {
        setMessage('')
        if (id === 'premium') {
          becomePremium().then((becomeRes) => {
            setMessage(`${becomeRes.data.message}`)
            if (becomeRes.status === 201) {
              login({
                username: JSON.parse(localStorage.getItem('user')).account.username,
                password,
              }).then((lastLogin) => {
                if (lastLogin.message) setMessage(lastLogin.message)
                history.push('/')
              })
            }
          })
        }
        if (id === 'artist') {
          becomeArtist(artist).then((becomeRes) => {
            setMessage(`${becomeRes.data.message}`)
            if (becomeRes.status === 201) {
              login({
                username: JSON.parse(localStorage.getItem('user')).account.username,
                password,
              }).then((lastLogin) => {
                if (lastLogin.message) setMessage(lastLogin.message)
                history.push('/home/discover')
              })
            }
          })
        }
        if (id === 'manager') {
          becomeManager().then((becomeRes) => {
            setMessage(`${becomeRes.data.message}`)
            if (becomeRes.status === 201) {
              login({
                username: JSON.parse(localStorage.getItem('user')).account.username,
                password,
              }).then((lastLogin) => {
                if (lastLogin.message) setMessage(lastLogin.message)
                history.push('/home/discover')
              })
            }
          })
        }
      }
    })
  }

  return (
    <div className={styles.container}>
      <TextLight text={`Enter your password to become ${id}`} type={TEXTS.TITLE2} />
      <InputLight
        type="password"
        name="password"
        value={password}
        onChange={handlePassChange}
        placeHolder="Confirm your password"
      />
      {
        (id === 'premium')
        && (
          <div className={styles['button-container']}>
            <ButtonLight text="Become Premium!" onClick={() => successLogin()} />
          </div>
        )
      }
      {
        (id === 'artist')
        && (
        <div className={styles['form-artist']}>
          <InputLight
            title="Id for the Artist"
            type="text"
            name="id"
            value={artist.id}
            onChange={handleInputArtistChange}
            placeHolder="Enter an id for the Artist"
          />
          <InputLight
            title="Artistic name"
            type="text"
            name="artistic_name"
            value={artist.artistic_name}
            onChange={handleInputArtistChange}
            placeHolder="Enter your Artistic name"
          />
          <div className={styles['button-container']}>
            <ButtonLight text="Become Artist!" onClick={() => successLogin()} />
          </div>
        </div>
        )
      }
      {
        (id === 'manager')
        && (
          <div className={styles['button-container']}>
            <ButtonLight text="Become Manager!" onClick={() => successLogin()} />
          </div>
        )
      }
      <TextLight text={message} type={TEXTS.WARNING} />
    </div>
  )
}

export default Become
