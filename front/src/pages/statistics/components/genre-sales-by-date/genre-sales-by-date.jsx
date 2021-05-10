import React, { useState } from 'react'
import ButtonLight from '../../../../components/button-light/button-light'
import Genre from '../../../../components/genre/genre'
import InputLight from '../../../../components/input-light/input-light'
import TextLight from '../../../../components/text-light/text-light'
import { genreSalesByDate } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './genre-sales-by-date.css'

const GenreSalesByDate = () => {
  const [data, setData] = useState([])
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  })

  const handleInputChangeDate = (event) => {
    const { value } = event.target
    const { name } = event.target
    setDates({
      ...dates,
      [name]: value,
    })
  }

  const getSales = () => {
    if (dates.startDate === '' || dates.endDate === '') {
      alert('Enter start and end dates')
    } else if (Date.parse(dates.startDate) > Date.parse(dates.endDate)) {
      alert('Start date can\'t be greater than end date')
    } else {
      genreSalesByDate(dates).then((res) => setData(res))
    }
  }

  return (
    <div className={styles.container}>
      <TextLight text="Genre sales given a date range" type={TEXTS.TITLE2} />
      <div className={styles['inputs-container']}>
        <InputLight
          title="Start Date"
          type="date"
          name="startDate"
          value={dates.startDate}
          onChange={handleInputChangeDate}
          placeHolder="Select Start Date"
        />
        <InputLight
          title="End Date"
          type="date"
          name="endDate"
          value={dates.endDate}
          onChange={handleInputChangeDate}
          placeHolder="Select End Date"
        />
        <ButtonLight text="Get Sales" onClick={getSales} />
      </div>
      <div className={styles['grid-container']}>
        {
        data.map((genre) => (
          <div key={genre.id}>
            <p>{`$${genre.sales} USD`}</p>
            <Genre id={genre.id.toString()} name={genre.name} />
          </div>
        ))
        }
      </div>
      {
        (data.length === 0) && <p>There is no sales for genres between these dates</p>
      }
    </div>
  )
}

export default GenreSalesByDate
