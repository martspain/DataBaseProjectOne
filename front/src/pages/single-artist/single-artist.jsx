import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Album from '../../components/album/album'
import SimpleSong from '../../components/simple-song/simple-song'
import { getArtist } from '../../services/artistService'
import styles from './single-artist.css'

const SingleArtist = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getArtist(id).then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <h1>{data.artistic_name}</h1>
      <p>Albums</p>
      <div className={styles['single-artist-albums']}>
        {
        data.albums?.map((album) => (
          <Album album={album} />
        ))
      }
      </div>
      <p>Songs</p>
      <div className={styles['single-artist-songs']}>
        {
            data.songs?.map((song) => (<SimpleSong song={song} />))
        }
      </div>
    </div>
  )
}

export default SingleArtist
