import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SimpleSong from '../../components/simple-song/simple-song'
import getGenre from '../../services/genreService'
import styles from './single-genre.css'

const SingleGenre = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getGenre(id).then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <h1>{data.name}</h1>
      <p>Songs</p>
      <div className={styles['single-genre-songs']}>
        {
          data.songs?.map((song) => (<SimpleSong key={song.id} song={song} />))
        }
      </div>
    </div>
  )
}

export default SingleGenre
