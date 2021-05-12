import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { getSubscribedAccounts } from '../../services/subscriptionService'
import TEXTS from '../../services/texts'
import styles from './remove-subscriptions.css'

const RemoveSubscriptions = () => {
  const [data, setData] = useState([])
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getSubscribedAccounts().then((res) => setData(res))
  }, [data])

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    setToFind(value)
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search Account:"
        type="text"
        name="search-subscribed-account-spofity"
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
            <TextLight text={`${new Date(account.start_date).toDateString()} to ${new Date(account.end_date).toDateString()}`} type={TEXTS.TEXT} />
            <div className={`${!account.active ? styles.deactive : {}} ${styles['is-active']}`}>
              <TextLight text={account.active ? 'Active' : 'Deactive'} type={TEXTS.TITLE3} />
            </div>
            <ButtonLight text="Remove Subscription" onClick={() => {}} />
          </div>
        ))
      }
    </div>
  )
}

export default RemoveSubscriptions
