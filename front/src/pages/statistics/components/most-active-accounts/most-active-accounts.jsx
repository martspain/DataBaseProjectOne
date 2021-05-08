import React, { useState, useEffect } from 'react'
import TextLight from '../../../../components/text-light/text-light'
import { mostActiveAccounts } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from '../subscription-count/subscription-count.css'

const MostActiveAccounts = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    mostActiveAccounts().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Most active accounts on the platform" type={TEXTS.TITLE2} />
      <div className={styles['cards-container']}>
        <p>Account Username</p>
        <p>Number of Reproductions</p>
        {
          data.map((account) => (
            <>
              <p>{account.username}</p>
              <p>{account.cantidad_reproducciones}</p>
            </>
          ))
        }
      </div>
      {
        (data.length === 0) && <p>There is not new subscriptions</p>
      }
    </div>
  )
}

export default MostActiveAccounts
