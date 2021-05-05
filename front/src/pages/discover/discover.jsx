import React from 'react'
import Album from '../../components/album/album'
import { getAllAlbums } from '../../services/albumService'
import styles from './discover.css'

const Discover = () => {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    getAllAlbums().then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Discover Music</h1>
      <div>
        {data?.map((album) => <Album key={album.id} album={album} />)}
      </div>
    </div>
  )
}

export default Discover
