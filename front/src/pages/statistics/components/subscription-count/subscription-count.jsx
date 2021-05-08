import React, { useState, useEffect } from 'react'
import TextLight from '../../../../components/text-light/text-light'
import { subscriptionCount } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './subscription-count.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const SubscriptionCount = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    subscriptionCount().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Number of new monthly subscriptions during the last 6 months" type={TEXTS.TITLE2} />
      <div className={styles['cards-container']}>
        <p>Month of Year</p>
        <p>Number of subscriptions</p>
        {data.map((month) => (
          <React.Fragment key={`${months[new Date(month.start_date_a_mes).getMonth() + 1]}
            of ${new Date(month.start_date_a_mes).getFullYear()}`}>
            <p>
              {`${months[new Date(month.start_date_a_mes).getMonth() + 1]}
            of ${new Date(month.start_date_a_mes).getFullYear()}`}
            </p>
            <p>{month.cantidad}</p>
          </React.Fragment>
        ))}
      </div>
      {
        (data.length === 0) && <p>There is not new subscriptions</p>
      }
    </div>
  )
}

export default SubscriptionCount
