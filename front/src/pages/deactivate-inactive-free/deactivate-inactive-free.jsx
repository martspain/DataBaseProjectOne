import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { deactivateNonSubscribed, getNonSubscribedAccounts } from '../../services/subscriptionService'
import TEXTS from '../../services/texts'
import styles from './deactivate-inactive-free.css'

const DeactivateInactiveFree = () => {
  const [data, setData] = useState([])
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getNonSubscribedAccounts().then((res) => setData(res))
  }, [data])

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    setToFind(value)
  }

  const deactivate = (account) => {
    deactivateNonSubscribed({ username: account.username, active: !account.active }).then(() => {
      getNonSubscribedAccounts().then((res) => setData(res))
    })
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search Account:"
        type="text"
        name="search-non-subscribed-account-spofity"
        value={toFind}
        onChange={handleInputChangeSearch}
        placeHolder="Enter username, first name, last name or email to Find"
      />
      {
        data.filter((account) => (
          account.username?.toLowerCase().includes(toFind.toLowerCase())
          || account.first_name?.toLowerCase().includes(toFind.toLowerCase())
          || account.last_name?.toLowerCase().includes(toFind.toLowerCase())
          || account.email?.toLowerCase().includes(toFind.toLowerCase())
        )).map((account) => (
          <div className={styles['account-container']}>
            <TextLight text={account.username} type={TEXTS.TITLE3} />
            <TextLight text={`${account.first_name} ${account.last_name ? account.last_name : ''}`} type={TEXTS.TEXT} />
            <TextLight text={account.email} type={TEXTS.TEXT} />
            <div className={!account.active ? styles.deactive : {}}>
              <TextLight text={account.active ? 'Active' : 'Deactive'} type={TEXTS.TITLE3} />
            </div>
            {
              (account.active)
                ? (
                  <ButtonLight text="Deactivate" onClick={() => deactivate(account)} />
                ) : (
                  <ButtonLight text="Activate" onClick={() => deactivate(account)} />
                )
            }
          </div>
        ))
      }
    </div>
  )
}

export default DeactivateInactiveFree
