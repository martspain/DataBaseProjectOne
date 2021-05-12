import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { deactivateArtist, getArtistsAccounts } from '../../services/artistService'
import TEXTS from '../../services/texts'
import styles from './deactivate-artists.css'

const DeactivateArtists = () => {
  const [data, setData] = useState([])
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getArtistsAccounts().then((res) => setData(res))
  }, [data])

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    setToFind(value)
  }

  const changeActive = (artist) => {
    deactivateArtist({ id: artist.id, active: !artist.active }).then(() => {
      getArtistsAccounts().then((res) => setData(res))
    })
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search Artist:"
        type="text"
        name="search-artist-account-spofity"
        value={toFind}
        onChange={handleInputChangeSearch}
        placeHolder="Enter artistic name, username, first name, last name or email to Find"
      />
      {
        data.filter((account) => (
          account.artistic_name?.toLowerCase().includes(toFind.toLowerCase())
          || account.username?.toLowerCase().includes(toFind.toLowerCase())
          || account.first_name?.toLowerCase().includes(toFind.toLowerCase())
          || account.last_name?.toLowerCase().includes(toFind.toLowerCase())
          || account.email?.toLowerCase().includes(toFind.toLowerCase())
        )).map((account) => (
          <div className={styles['account-container']}>
            <Link to={`/artist/${account.id}`}>
              <TextLight text={account.artistic_name} type={TEXTS.TITLE3} />
              <TextLight text={account.username} type={TEXTS.TITLE3} />
            </Link>
            <TextLight text={`${account.first_name} ${account.last_name ? account.last_name : ''}`} type={TEXTS.TEXT} />
            <TextLight text={account.email} type={TEXTS.TEXT} />
            <div className={!account.active ? styles.deactive : {}}>
              <TextLight text={account.active ? 'Active' : 'Deactive'} type={TEXTS.TITLE3} />
            </div>
            {
              (account.active)
                ? (
                  <ButtonLight text="Deactivate" onClick={() => changeActive(account)} />
                ) : (
                  <ButtonLight text="Activate" onClick={() => changeActive(account)} />
                )
            }
          </div>
        ))
      }
    </div>
  )
}

export default DeactivateArtists
