import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { createMonitor, noMonitors } from '../../services/monitorsService'
import TEXTS from '../../services/texts'
import styles from './make-monitor.css'

const MakeMonitor = () => {
  const [data, setData] = useState([])
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    noMonitors().then((res) => setData(res))
  }, [data])

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    setToFind(value)
  }

  const makeMonitor = (username, type) => {
    createMonitor({
      username,
      monitor_type: type,
    })
    noMonitors().then((res) => setData(res))
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search Account:"
        type="text"
        name="search-account-to-make-monitor-spofity"
        value={toFind}
        onChange={handleInputChangeSearch}
        placeHolder="Enter username, first name, last name or email to Find"
      />
      <div>
        {
          data.filter((account) => (
            account.username?.toLowerCase().includes(toFind.toLowerCase())
            || account.first_name?.toLowerCase().includes(toFind.toLowerCase())
            || account.last_name?.toLowerCase().includes(toFind.toLowerCase())
            || account.email?.toLowerCase().includes(toFind.toLowerCase())))
            .map((account) => (
              <div key={account.username} className={styles['account-container']}>
                <TextLight text={account.username} type={TEXTS.TITLE3} />
                <TextLight text={`${account.first_name} ${account.last_name ? account.last_name : ''}`} type={TEXTS.TEXT} />
                <TextLight text={account.email} type={TEXTS.TEXT} />
                <ButtonLight text="Make Monitor A" onClick={() => makeMonitor(account.username, 'A')} />
                <ButtonLight text="Make Monitor B" onClick={() => makeMonitor(account.username, 'B')} />
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default MakeMonitor
