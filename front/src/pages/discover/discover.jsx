import React from 'react'
import Album from '../../components/album/album'
import TextLight from '../../components/text-light/text-light'
import { getAllAlbums } from '../../services/albumService'
import TEXTS from '../../services/texts'
import styles from './discover.css'

const Discover = () => {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    getAllAlbums().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <TextLight text="Discover Music" type={TEXTS.SECTIONTITLE} />
      <div>
        {data?.map((album) => <Album key={album.id} album={album} />)}
      </div>
    </div>
  )
}

export default Discover
