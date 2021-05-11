import React, { useState, useEffect } from 'react'
import TextLight from '../../components/text-light/text-light'
import { getBinnacle } from '../../services/binnacle'
import TEXTS from '../../services/texts'
import styles from './binnacle.css'

const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

const Binnacle = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getBinnacle().then((res) => setData(res))
  }, [])

  const formatDateHour = (dateHour) => {
    let formated = null
    formated = `${days[new Date(dateHour).getDay() - 1]}, 
    ${new Date(dateHour).getDate()}-${new Date(dateHour).getMonth() + 1}-${new Date(dateHour).getFullYear()},
    Hora: ${new Date(dateHour).toLocaleTimeString()}`
    return formated
  }

  return (
    <div className={styles.container}>
      <TextLight text="Binnacle" type={TEXTS.TITLE2} />
      <div className={styles.register}>
        <TextLight text="Author" type={TEXTS.TITLE3} />
        <TextLight text="Table Affected" type={TEXTS.TITLE3} />
        <TextLight text="Action" type={TEXTS.TITLE3} />
        <TextLight text="Record Date" type={TEXTS.TITLE3} />
      </div>
      {
        data.map((register) => (
          <div className={styles.register}>
            <TextLight text={register.author} type={TEXTS.TEXT} />
            <TextLight text={register.table_affected} type={TEXTS.TEXT} />
            <TextLight text={register.action} type={TEXTS.TEXT} />
            <TextLight text={formatDateHour(register.record_date)} type={TEXTS.TEXT} />
          </div>
        ))
      }
    </div>
  )
}

export default Binnacle
