/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import ButtonLight from '../../../../components/button-light/button-light'
import InputLight from '../../../../components/input-light/input-light'
import SongCard from '../../../../components/song-card/song-card'
import TextLight from '../../../../components/text-light/text-light'
import { searchArtist } from '../../../../services/searchService'
import { mostPlayedSongsByArtist } from '../../../../services/statisticsService'
import TEXTS from '../../../../services/texts'
import styles from './most-played-songs-by-artist.css'

const MostPlayedSongsByArtist = () => {
  const [data, setData] = useState([])
  const [toFind, setToFind] = useState('')
  const [artists, setArtists] = useState([])
  const [limit, setLimit] = useState('10')

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    searchArtist(toFind).then((res) => setArtists(res))
    setToFind(value)
  }

  useEffect(() => {
  }, [artists])

  const handleInputChangeNumber = (event) => {
    const { value } = event.target
    if (parseInt(value, 10) < 1) setLimit('1')
    else if (parseInt(value, 10) > 100) setLimit('100')
    else setLimit(value)
  }

  const getSales = () => {
    if (toFind === '') alert('Busque y seleccione un artista')
    else mostPlayedSongsByArtist(toFind, limit).then((res) => setData(res))
  }

  return (
    <div className={styles.container}>
      <TextLight text="Most Played Songs By Artist" type={TEXTS.TITLE2} />
      <div className={styles['inputs-container']}>
        <InputLight
          title="Search Artist"
          type="search"
          name="toFind"
          value={toFind}
          onChange={handleInputChangeSearch}
          placeHolder="Search an artist by name"
          list="search-most-played-songs-by-artist"
        />
        <datalist id="search-most-played-songs-by-artist">
          {
            artists.map((artist) => <option value={artist.found.id} label={artist.found.artistic_name} />)
          }
        </datalist>
        <InputLight
          title="Number of songs to show"
          type="number"
          name="limit"
          value={limit}
          onChange={handleInputChangeNumber}
          placeHolder="Enter the limit N of songs to show"
          min="1"
          max="100"
        />
        <ButtonLight text="Get Sales" onClick={getSales} />
      </div>
      <div className={styles['grid-container']}>
        {
        data.map((song) => (
          <div key={song.id}>
            <p>{`${song.count} Reproductions`}</p>
            <SongCard song={song} />
          </div>
        ))
        }
      </div>
      {
        (data.length === 0) && <p>There is no played songs for this artist</p>
      }
    </div>
  )
}

export default MostPlayedSongsByArtist
