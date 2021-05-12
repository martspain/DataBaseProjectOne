import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SimpleSong from '../../components/simple-song/simple-song'
import { getAlbum } from '../../services/albumService'
import styles from './single-album.css'

const SingleAlbum = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getAlbum(id).then((res) => setData(res))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={data.preview_url} alt="album cover" />
        <div>
          <h1>{data.name}</h1>
          {
            data.artists?.map((artist) => (
              <React.Fragment key={artist.id}>
                <Link to={`/home/artist/${artist.artist_id}`}>
                  <p>{artist.artistic_name}</p>
                </Link>
              </React.Fragment>
            ))
          }
          <p>
            {
              `${new Date(data.launch_date).getDate()} -
              ${new Date(data.launch_date).getMonth() + 1} -
              ${new Date(data.launch_date).getFullYear()}`
            }
          </p>
        </div>
      </div>
      <div className={styles['single-album-songs']}>
        <p>Songs of this Album</p>
        {
          data.songs?.map((song) => (
            <React.Fragment key={song.id}>
              <SimpleSong song={song} />
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default SingleAlbum
