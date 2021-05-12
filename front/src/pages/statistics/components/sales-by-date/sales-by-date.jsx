import React, { useState, useEffect } from 'react'
import ButtonLight from '../../../../components/button-light/button-light'
import InputLight from '../../../../components/input-light/input-light'
import TextLight from '../../../../components/text-light/text-light'
import { salesByDate } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './sales-by-date.css'

const SalesByDate = () => {
  const [data, setData] = useState([])
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  })

  const handleInputChange = (event) => {
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
      salesByDate(dates).then((res) => setData(res))
    }
  }

  useEffect(() => {
  }, [data])

  return (
    <div className={styles.container}>
      <TextLight text="Sales per week given a date range" type={TEXTS.TITLE2} />
      <div className={styles['inputs-container']}>
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
        <ButtonLight text="Get Sales" onClick={getSales} />
      </div>
      <div className={styles['table-container']}>
        <p>Week that started on monday</p>
        <p>Sales in $USD</p>
        {data.map((week) => (
          <React.Fragment key={week.week}>
            <p>{`${new Date(week.week).getDate() + 1}-${new Date(week.week).getMonth() + 1}-${new Date(week.week).getFullYear()}`}</p>
            <p>{week.sales}</p>
          </React.Fragment>
        ))}
      </div>
      {
        (data.length === 0) && <p>There is no sales between these dates</p>
      }
    </div>
  )
}

export default SalesByDate
