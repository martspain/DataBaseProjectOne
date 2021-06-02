import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import SongCard from '../../components/song-card/song-card'
import TextLight from '../../components/text-light/text-light'
import { getAllUsers } from '../../services/accountService'
import { recommendation } from '../../services/migrationService'
import TEXTS from '../../services/texts'
import styles from './recommendation-to-user.css'

const RecommendationToUser = () => {
  const [data, setData] = useState({})
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('warning')

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res))
  }, [])

  const generate = () => {
    setTypeMessage('warning')
    setMessage('Loading')
    recommendation(username).then((res) => {
      console.log(res)
      setData(res)
      setTypeMessage('correct')
      setMessage(`Recomendaciones generadas para el usuario ${res.username}`)
    }).catch((error) => {
      setTypeMessage('error')
      setMessage(error.response.data.message)
    })
  }

  return (
    <div className={styles.container}>
      <TextLight text="Recommendate Songs to Users" type={TEXTS.TITLE2} />
      <div className={styles['action-container']}>
        <InputLight
          title="Username"
          type="search"
          name="toFind"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeHolder="Search an username to recommend songs"
          list="search-recommendation-to-user"
        />
        <datalist id="search-recommendation-to-user">
          {
            users.map((user) => (
              <option key={user.username} value={user.username} label={user.username} />
            ))
          }
        </datalist>
        <TextLight text="Leave Username input in blank to search for a random User" type={TEXTS.CORRECT} />
        <ButtonLight text="Generate" onClick={generate} />
      </div>
      <TextLight text={message} type={typeMessage} />
      <div className={styles.dual}>
        <div>
          <TextLight text="Canciones más reproducidas durante los últimos 90 días" type={TEXTS.TEXT} />
          {
            data.lastSongs && data.lastSongs.map((song) => (
              <>
                <TextLight text={song.genre} type={TEXTS.TITLE3} />
                <SongCard
                  song={{
                    id: song.song_id,
                    cover: song.preview_url,
                    name: song.name,
                    duration_ms: song.duration_ms,
                    album: song.album_name,
                    album_id: song.album_id,
                    artists: song.artists,
                    active: true,
                  }}
                />
                <div className={styles.separator} />
              </>
            ))
          }
        </div>
        <div>
          <TextLight text="Recomendaciones" type={TEXTS.TEXT} />
          {
            data.toRecommend && data.toRecommend.map((song) => (
              <>
                <TextLight text={song.genre} type={TEXTS.TITLE3} />
                <SongCard
                  song={{
                    id: song.song_id,
                    cover: song.preview_url,
                    name: song.name,
                    duration_ms: song.duration_ms,
                    album: song.album_name,
                    album_id: song.album_id,
                    artists: song.artists,
                    active: true,
                  }}
                />
                <div className={styles.separator} />
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RecommendationToUser
