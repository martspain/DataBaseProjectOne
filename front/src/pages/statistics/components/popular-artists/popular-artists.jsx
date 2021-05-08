import React, { useState, useEffect } from 'react'
import Artist from '../../../../components/artist/artist'
import TextLight from '../../../../components/text-light/text-light'
import { popularArtists } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './popular-artists.css'

const PopularArtists = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    popularArtists().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Top Artists with increasing popularity in the last 3 months" type={TEXTS.TITLE2} />
      <div className={styles['cards-container']}>
        {data.map((artist) => (
          <div key={artist.id}>
            <p>
              {artist.rep_por_artista}
              {' '}
              reproductions
            </p>
            <Artist id={artist.id} artisticName={artist.artistic_name} />
          </div>
        ))}
      </div>
      {
        (data.length === 0) && <p>There is not artists here</p>
      }
    </div>
  )
}

export default PopularArtists
