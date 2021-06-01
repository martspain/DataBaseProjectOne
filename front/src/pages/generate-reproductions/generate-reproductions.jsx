import React, { useState } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { generateReproductions } from '../../services/reproductionService'
import TEXTS from '../../services/texts'
import styles from './generate-reproductions.css'

const GenerateReproductions = () => {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
    quantity: 0,
  })
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('warning')
  const [timeoutMessage, setTimeoutMessage] = useState(() => {})

  const handleInputChange = (event) => {
    const { value } = event.target
    const { name } = event.target
    setDates({
      ...dates,
      [name]: value,
    })
  }

  const resetMessage = () => {
    setTimeoutMessage(setTimeout(() => {
      setTypeMessage('warning')
      setMessage('')
    }, 10000))
  }

  const generate = () => {
    setTypeMessage('warning')
    if (dates.startDate === '' || dates.endDate === '') {
      setMessage('Enter start and end dates')
    } else if (Date.parse(dates.startDate) > Date.parse(dates.endDate)) {
      setMessage('Start date can\'t be grater than end date')
    } else if (dates.quantity <= 0) {
      setMessage('Quantity need to be a positive number')
    } else {
      clearTimeout(timeoutMessage)
      setMessage('Loading')
      generateReproductions(dates, dates.quantity).then((res) => {
        setTypeMessage('correct')
        setMessage(res.data.message)
        resetMessage()
      }).catch((error) => {
        setTypeMessage('error')
        setMessage(error.response.data.message)
        resetMessage()
      })
    }
  }

  return (
    <div className={styles.container}>
      <TextLight text="Generate Reproductions" type={TEXTS.TITLE2} />
      <div className={styles['inputs-container']}>
        <InputLight
          title="Quantity"
          type="number"
          name="quantity"
          value={dates.quantity.toString()}
          onChange={handleInputChange}
          placeHolder="Insert Number of Songs to generate"
        />
        <InputLight
          title="Start Date"
          type="date"
          name="startDate"
          value={dates.startDate}
          onChange={handleInputChange}
          placeHolder="Select Start Date"
        />
        <InputLight
          title="End Date"
          type="date"
          name="endDate"
          value={dates.endDate}
          onChange={handleInputChange}
          placeHolder="Select End Date"
        />
        <ButtonLight text="Generate" onClick={generate} />
      </div>
      <TextLight text={message} type={typeMessage} />
    </div>
  )
}

export default GenerateReproductions
