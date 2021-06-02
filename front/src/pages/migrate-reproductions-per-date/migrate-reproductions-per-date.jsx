import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { migrateRepsPerDate, getLastUpdate } from '../../services/migrationService'
import TEXTS from '../../services/texts'
import styles from './migrate-reproductions-per-date.css'

const MigrateReproductionsPerDate = () => {
  const [date, setDate] = useState('')
  const [lastUpdateText, setLastUpdateText] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('warning')
  const [timeoutMessage, setTimeoutMessage] = useState(() => {})

  const updateLastUpdate = () => {
    getLastUpdate().then((res) => {
      if (res.lastUpdate) setLastUpdateText(`Last Update: ${res.lastUpdate}`)
      else setLastUpdateText(`Can't get Last Update: ${res.message}`)
    })
  }

  useEffect(() => {
    updateLastUpdate()
  }, [])

  const resetMessage = () => {
    setTimeoutMessage(setTimeout(() => {
      setTypeMessage('warning')
      setMessage('')
    }, 10000))
  }

  const migrate = () => {
    setTypeMessage('warning')
    if (date === '') {
      setMessage('Enter a date')
    } else if (Date.parse(date) > new Date().setDate(new Date().getDate() - 1)) {
      setMessage('Date can\'t be greater than today')
    } else {
      clearTimeout(timeoutMessage)
      setMessage('Loading')
      migrateRepsPerDate(date).then((res) => {
        setTypeMessage('correct')
        setMessage(res.data.message)
        resetMessage()
        updateLastUpdate()
      }).catch((error) => {
        setTypeMessage('error')
        setMessage(error.response.data.message)
        resetMessage()
      })
    }
  }

  return (
    <div className={styles.container}>
      <TextLight text="Migrate Reproductions to MongoDB" type={TEXTS.TITLE2} />
      <div className={styles['action-container']}>
        <TextLight text={lastUpdateText} type={TEXTS.CORRECT} />
        <InputLight
          title="Start Date"
          type="date"
          name="startDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeHolder="Select Start Date"
        />
        <ButtonLight text="Migrate " onClick={migrate} />
      </div>
      <TextLight text={message} type={typeMessage} />
    </div>
  )
}

export default MigrateReproductionsPerDate
