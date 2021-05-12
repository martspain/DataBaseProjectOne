import React, { useState, useEffect } from 'react'
import Genre from '../../../../components/genre/genre'
import TextLight from '../../../../components/text-light/text-light'
import { popularGenres } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './popular-genres.css'

const PopularGenres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    popularGenres().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Top Popular Genres in the last 3 months" type={TEXTS.TITLE2} />
      <div className={styles['grid-container']}>
        {
        data.map((genre) => (
          <div key={genre.id}>
            <p>
              {genre.rep_por_genero}
              {' '}
              reproductions
            </p>
            <Genre id={genre.id.toString()} name={genre.name} />
          </div>
        ))
        }
      </div>
      {
        (data.length === 0) && <p>There is not popular genres</p>
      }
    </div>
  )
}

export default PopularGenres
