import React, { useState, useEffect } from 'react'
import Artist from '../../../../components/artist/artist'
import TextLight from '../../../../components/text-light/text-light'
import { largestProductionArtists } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './largest-production-artists.css'

const LargestProductionArtists = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    largestProductionArtists().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Top Artists with the largest musical production" type={TEXTS.TITLE2} />
      <div className={styles['grid-container']}>
        {
          data.map((artist) => (
            <div key={artist.id}>
              <p>
                {artist.canciones_por_artista}
                {' '}
                songs
              </p>
              <Artist id={artist.id} artisticName={artist.artistic_name} />
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

export default LargestProductionArtists
