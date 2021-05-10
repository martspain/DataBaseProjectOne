import React, { useState } from 'react'
import ButtonLight from '../../../../components/button-light/button-light'
import InputLight from '../../../../components/input-light/input-light'
import TextLight from '../../../../components/text-light/text-light'
import { NartistSalesByDate } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from '../sales-by-date/sales-by-date.css'

const ArtistSalesByDate = () => {
  const [data, setData] = useState([])
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  })
  const [limit, setLimit] = useState('10')

  const handleInputChangeDate = (event) => {
    const { value } = event.target
    const { name } = event.target
    setDates({
      ...dates,
      [name]: value,
    })
  }

  const handleInputChange = (event) => {
    const { value } = event.target
    if (parseInt(value, 10) < 1) setLimit('1')
    else if (parseInt(value, 10) > 100) setLimit('100')
    else setLimit(value)
  }

  const getSales = () => {
    if (dates.startDate === '' || dates.endDate === '') {
      alert('Enter start and end dates')
    } else if (Date.parse(dates.startDate) > Date.parse(dates.endDate)) {
      alert('Start date can\'t be greater than end date')
    } else {
      NartistSalesByDate(dates, limit).then((res) => setData(res))
    }
  }

  return (
    <div className={styles.container}>
      <TextLight text="Top selling artists given a date range" type={TEXTS.TITLE2} />
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
        <InputLight
          title="Number of Artists to show"
          type="number"
          name="limit_artists"
          value={limit}
          onChange={handleInputChange}
          placeHolder="Enter the limit N of artists to show"
          min="1"
          max="100"
        />
        <ButtonLight text="Get Sales" onClick={getSales} />
      </div>
      <div className={styles['table-container']}>
        <p>Artist</p>
        <p>Sales in $USD</p>
        {data.map((artist) => (
          <React.Fragment key={artist.id}>
            <p>{artist.artistic_name}</p>
            <p>{artist.sales}</p>
          </React.Fragment>
        ))}
      </div>
      {
        (data.length === 0) && <p>There is no artists sales between these dates</p>
      }
    </div>
  )
}

export default ArtistSalesByDate
