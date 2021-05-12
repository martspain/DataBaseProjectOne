import React, { useState, useEffect } from 'react'
import Album from '../../../../components/album/album'
import TextLight from '../../../../components/text-light/text-light'
import { recentAlbums } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './recent-albums.css'

const RecentAlbums = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    recentAlbums().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Recent Albums of Last Week" type={TEXTS.TITLE2} />
      <div className={styles['albums-container']}>
        {
          data.map((album) => <Album key={album.id} album={album} />)
        }
      </div>
      {
        (data.length === 0) && <TextLight text="There is not albums this week" type={TEXTS.TEXT} />
      }
    </div>
  )
}

export default RecentAlbums
